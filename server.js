const express = require('express');
const app = express();
const Product = require('./models/productModel');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//find all product 
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//find product by product id
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})
//delete product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'});
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})


//create database 
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })

    }
    // console.log(req.body);
    // res.send(req.body);
})
// mongoose.set("strictQuery", false);
//update the products
app.put('/products/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we not find any product in the database
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
} )

mongoose
    .connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(() => {
        console.log("connect to mongodb")
        app.listen(5000, () => {
            console.log("server is running on port : 5000 ");
        })
    })
    .catch(error => console.log(error));

