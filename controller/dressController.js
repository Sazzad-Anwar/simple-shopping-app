//jshint esversion:10
const product = require('../model/product');
const purchase = require('../model/purchase');


//Burundi dress collection page
exports.burundiDress = (req, res) => {
    product.find({
        country: "Burundi"
    }).then(burundi => {
        res.render("burundi", {
            burundi
        });
    });
};


//Bangladeshi dress collecton page
exports.bangladeshiDress = (req, res) => {
    product.find({
        country: "Bangladesh"
    }).then(bangladeshi => {
        res.render("bangladeshi", {
            bangladeshi
        });
    });
};


//Russian dress collections dress
exports.russianDress = (req, res) => {
    product.find({
        country: "Russia"
    }).then(russia => {
        res.render("russian", {
            russia
        });
    });
};


//Zambian dress collection dress
exports.zambianDress = (req, res) => {
    product.find({
        country: "Zambia"
    }).then(zambian => {
        res.render("zambian", {
            zambian
        });
    });
};


//Product Selecting page
exports.selectProduct = (req, res) => {
    const id = req.body.id;
    product.findOne({
        _id: id
    }, (err, found) => {
        if (err) throw err;
        res.render('single-product', {
            found
        });
    });
};


//Product buying page
exports.buyProducts = (req, res) => {
    const code = req.body.code;
    const amount = req.body.quantity;
    product.findOne({
        code: code
    }, (err, found) => {
        if (err) throw err;
        if (found) {
            const price = Number((found.price * amount).toPrecision(5));
            res.render('payment', {
                found,
                price,
                amount
            });
        } else {
            res.status(404).send('Content not found');
        }

    });
};

// purchased Items' list
exports.purchaseditem = (req, res) => {
    const email = req.body.email;
    purchase.find({
        email: email
    }).then(foundItem => {
        res.render('purchase',{foundItem});
    }).catch(err => res.send('content not found'));
};


// cancel order
exports.cancelOrder = (req,res)=>{
    const id = req.body.id;
    console.log(id);
    purchase.deleteOne({_id:id}).then(remove => {
        console.log(remove.id+" has removed ");
        req.flash('success_msg',"Order canceled Check Your cart !");
        res.redirect('/dashboard');
    });
};