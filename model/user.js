//jshint esversion:10
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"User name is missing"]
    },
    email:{
        type:String,
        lowercase: true,
        unique:true,
        required:[true,"Email is missing"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const User = new mongoose.model("User",userSchema);

module.exports = User;