//jshint esversion:10

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogName:{
        type:String,
        required:[true,'Blog name is required']
    },
    blogMessage:{
        type:String,
        required:[true,'Blog message is required']
    },
    date:{
        type: Date,
        default: Date.now
    },
    userName:{
        type:String,
        required:[true,'User name is required for blog post']
    },
    userEmail:{
        type:String,
        required:[true,"User email is required for blog post"]
    }
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;