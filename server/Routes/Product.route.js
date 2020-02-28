 // Importing important packages
 const express = require('express');
 
 // Using express and routes
 //const app = express();
 const productRoute = express.Router();
 
 // Product module which is required and imported
 let productModel = require('../Model/Product');
 
 // To Get List Of Eroducts
 productRoute.route('/').get(function (req, res) {
 productModel.find(function (err, product) {
 if (err) {
 console.log(err);
 }
 else {
 res.json(product);
 }
 });
 });
 
 // To Add New Product
 productRoute.route('/addProduct').post(function (req, res) {
 let product = new productModel(req.body);
 product.save()
 .then(game => {
 res.status(200).json({ 'product': 'Product Added Successfully' });
 })
 .catch(err => {
 res.status(400).send("Something Went Wrong");
 });
 });
 
 // To Get Eroduct Details By Product ID
 productRoute.route('/editProduct/:id').get(function (req, res) {
 let id = req.params.id;
 productModel.findById(id, function (err, product) {
 res.json(product);
 });
 });
 
 // To Update The Product Details
 productRoute.route('/updateProduct/:id').post(function (req, res) {
 productModel.findById(req.params.id, function (err, product) {
 if (!product)
 return next(new Error('Unable To Find Product With This Id'));
 else {
 product.name = req.body.name;
 product.description = req.body.description;
 product.reviews.client_name = req.body.reviews.client_name;
 product.reviews.reviews_comment = req.body.reviews.reviews_comment;
 product.reviews.stars = req.body.reviews.stars;
 product.size = req.body.size;
 product.color = req.body.color;
 product.stock = req.body.stock;
 product.current_price = req.body.last_price;
 product.old_price = req.body.old_price;
 
 product.save().then(emp => {
 res.json('Product Updated Successfully');
 })
 .catch(err => {
 res.status(400).send("Unable To Update Product");
 });
 }
 });
 });
 
 // To Delete The Product
 productRoute.route('/deleteProduct/:id').get(function (req, res) {
 productModel.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
 if (err) res.json(err);
 else res.json('Product Deleted Successfully');
 });
 });
 
 module.exports = productRoute;