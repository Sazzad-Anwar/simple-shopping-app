//jshint esversion:10
const express = require("express");
const app = express();
const route = require('./route/allRoute');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const product = require('./model/product');
const user = require('./model/user');
const purchase = require('./model/purchase');

//passport config
require('./config/passport')(passport);

//express middleware setup
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//passport middleware function
app.use(passport.initialize());
app.use(passport.session());

//Connecttion to database
// const dbConnection = "mongodb://localhost:27017/afrobang";
const dbConnection = "mongodb+srv://afrobang:afrobang@afrobang-a2xpa.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(db => {
    if (db) {
        console.log(`Database has established the connection`);
    }
}).catch(console.error());

//engine set up
app.set("view engine", 'ejs');


//defining the home route
app.use("/", route);


// app.get('/json/:id', (req, res) => {
//     product.find({ _id: req.params.id }).then(found => {
//         let item = found.length;
//         res.json({
//             item,
//             found
//         });
//     });
// });

// app.get('/json/user/id', (req, res) => {
//     user.find().then(foundUser => {
//         if (foundUser) {
//             res.json(foundUser);
//         }
//     });
// });
// app.get('/:email', (req, res) => {
//     purchase.find({ email: req.params.email }).then(foundUser => {
//         if (foundUser) {
//             res.json({ foundUser, item: foundUser.length });
//         }
//     });
// });
// app.get('/purchase/purchaseItem', (req, res) => {
//     purchase.find().then(foundUser => {
//         if (foundUser) {
//             res.json({
//                 foundUser,

//             });
//         }
//     });
// });

//server running functionality
const port = 5000;
app.listen(port, () => {
    console.log(`
                                App is running on localhost: ${ port }
                                `);
});