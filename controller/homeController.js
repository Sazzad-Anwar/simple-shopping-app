//jshint esversion:10

const blog = require('../model/blog');

//load Home page
exports.homePage = (req,res)=>{
    res.render("index");
};

// load blog page
exports.blog = (req,res)=>{
    blog.find().then(blogs =>{
        res.render('blog',{blogs});
    });
};

// load contact page
exports.contact = (req,res)=>{
    res.render('contact');
};

// write blog route
exports.writeBlog = (req,res)=>{
    const {userEmail,message,title,userName} = req.body;
    const newBlog = blog({
        blogName:title,
        blogMessage:message,
        userEmail: userEmail,
        userName: userName
    });
    newBlog.save().then(saved =>{
        res.redirect('/blog');
    });
};