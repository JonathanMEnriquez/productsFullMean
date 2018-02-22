var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './productsApp', '/dist')));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/productsApp');

var productsSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 4},
    price: {type: Number, required: true},
    imgUrl: {type: String, required: true}
}, {timestamps: true});

mongoose.model('Products', productsSchema);
var Product = mongoose.model('Products');

app.get('/api/products', function (req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Successfully got all the products!", data: products });
        }
    })
})

app.get('/api/products/:id', function (req, res) {
    Product.findOne({_id: req.params.id}, function (err, product) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Successfully got one product!", data: product });
        }
    })
})

app.post('/api/products', function(req, res) {
    var product = new Product(req.body);
    product.save(function (err, product) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Successfully created one!", data: product });
        }
    })
})

app.put('/api/products/:id', function(req, res) {
    Product.update({_id: req.params.id}, { title: req.body.title, price: req.body.price, imgUrl: req.body.imgUrl }, function(err, product) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Successfully updated one!", data: product });
        }
    })
})

app.delete('/api/products/:id', function(req, res) {
    Product.remove({_id: req.params.id}, function(err) {
        if (err) {
            console.log(err);
            res.json({message: "Error", errors, err});
        } else {
            res.json({message: "Successfully deleted a product"});
        }
    })
})

app.all('*', (req, res, next)=> {
    res.sendFile(path.resolve('./productsApp/dist/index.html'));
})

app.listen(8000, function() {
    console.log('listening on port 8000');
})