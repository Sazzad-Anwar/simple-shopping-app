//jshint esversion:10
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: [true, 'Code number is required']
    },
    country: {
        type: String,
        required: [true, 'Country name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    image: {
        type: String,
        required: [true, 'Image path is required']
    }
});

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;