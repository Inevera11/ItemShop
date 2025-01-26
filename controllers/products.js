const Product = require('../models/product');

exports.getAddProductPage = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProductsPage = (req, res) => {
    res.render('shop', {
        prods: Product.fetchAll(),
        pageTitle: 'Shop',
        path: '/',
    });
};
