//jshint esversion:10
const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController');
const dressController = require('../controller/dressController');
const loginRegController = require('../controller/loginRegister');

const {
    forwardAuthenticated,
    ensureAuthenticated
} = require('../config/auth');
router.use(express.static('public'));
router.use(express.urlencoded({
    extended: true
}));


// Homepage Route
router
    .route('/')
    .get(homeController.homePage);


// Burundi Dress Collection Route
router
    .route('/burundi-dress-collections')
    .get(dressController.burundiDress);


// Bangladeshi Dress Collection Route
router
    .route('/bangladeshi-dress-collections')
    .get(dressController.bangladeshiDress);


// Russian Dress Collection Route
router
    .route('/russian-dress-collections')
    .get(dressController.russianDress);


// Zambian Dress Collection Route
router
    .route('/zambian-dress-collections')
    .get(dressController.zambianDress);


// Single Item Selecting Route
router
    .route('/select')
    .post(dressController.selectProduct);


// Buying Route
router
    .route('/pay')
    .post(dressController.buyProducts);

//Payment Route
router
    .route('/payment')
    .post(loginRegController.payment);

// Blog Route
router
    .route('/blog')
    .get(homeController.blog);

//login page route
router
    .route('/login')
    .get(forwardAuthenticated, loginRegController.loginPage)
    .post(loginRegController.loginPost);



//logout route
router
    .route('/logout')
    .post(loginRegController.logout);


//register page route
router
    .route('/register')
    .get(forwardAuthenticated, loginRegController.registerPage)
    .post(forwardAuthenticated, loginRegController.register);

//delete route
router
    .route('/delete')
    .post(loginRegController.delete);

//order cancelation route
router
    .route('/productDelete')
    .post(dressController.cancelOrder);

//user info Edit route
router
    .route('/userEdit')
    .get();


//user dashboard route
router
    .route('/dashboard')
    .get(ensureAuthenticated, loginRegController.dashboard);

// user purchse list
router
    .route('/purchaseItem')
    .post(dressController.purchaseditem);


// contact route
router 
    .route('/contact')
    .get(homeController.contact);

// delete user account
router
    .route('/deleteUser')
    .post(loginRegController.deleteUser);

// Write blog page
router
    .route('/writeBlog')
    .post(homeController.writeBlog);

module.exports = router;