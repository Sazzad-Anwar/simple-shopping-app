//jshint esversion:10
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const purchaseSchema = new schema({
    purchaseID: {
        type: String,
        required: [true, 'Id is required']
    },
    email: {
        type: String,
        required: [true, "User email is missing"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: [true, "Product image is required"]
    },
    amount: {
        type: Number,
        required: [true, "Product amount is not inserted"]
    },
    price: {
        type: Number,
        required: [true, 'Price is not inserted']
    },
    name:{
        type: String,
        required:[true, "Product name is required"]
    }
});



const Purchase = new mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;