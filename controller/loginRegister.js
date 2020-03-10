//jshint esversion:10
const user = require('../model/user');
const bcrypt = require('bcryptjs');
const passpost = require('passport');
const purchase = require('../model/purchase');
const product = require('../model/product');


//Loadin the login page
exports.loginPage = (req, res) => {
    res.render('login');
};

//loading the registration page
exports.registerPage = (req, res) => {
    res.render('register');
};

//Check existing user or creating a new user
exports.register = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
    } else {
        user.findOne({ email: email }).then(found => {
            if (found) {
                errors.push({ msg: "Email already exists" });
                res.render('register', { errors, name, email, password, password2 });
            } else {
                const newUser = new user({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', "You are now registered and can log in");
                            res.redirect('/login');
                        }).catch(err => res.status(404).send("Content not found"));
                    });
                });
            }
        });
    }
};


//Login method
exports.loginPost = (req, res, next) => {
    passpost.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

//Logout method
exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', "Logged Out!!");
    res.redirect("/login");
};

//User dashboard
exports.dashboard = (req, res) => {
    res.render('dashboard', { user: req.user });
};

//User account delete
exports.delete = (req, res) => {
    const id = req.body.id;
    user.deleteOne(id).then(deleted => {
        if (deleted) {
            req.flash('success_msg', "Account deleted !!");
            res.rendirect('/login');
        }
    }).catch(err => res.status(502).send('Bad gateway !'));
};


//Payment successfull route
exports.payment = (req, res) => {
    const {productName,
        id,
        email,
        amount,
        price,
        image
    } = req.body;

    user.findOne({ email: email }).then(foundUser => {
        if (foundUser) {
            const newItem = new purchase({
                purchaseID: id,
                email: email,
                amount: amount,
                price: price,
                image: image,
                name:productName
            });
            newItem.save().then(success =>{
                req.flash("success_msg", "Payment Success Check your cart ");
                res.redirect('/dashboard');
            }).catch(err => res.send('Error at payment-> success'));
            console.log('found User');
            
            
        } if(!foundUser) {
            req.flash("error_msg", "This email is not registered user email !");
            res.redirect('/dashboard');
            console.log('does not found user');
            
           
        }
    }).catch(err => res.send("User doesn't found put a registered email"));
};

exports.deleteUser = (req,res)=>{
    const email = req.body.email;
    user.deleteOne({email:email}).then(deleted =>{
        console.log('User has been deleted');
        purchase.deleteMany({email:email}).then(deletePurchase =>{
            console.log('Purchase list has deleted');
            req.flash('success_msg','Account has been deleted');
            res.redirect('/register');
        });
    });
};