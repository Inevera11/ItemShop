const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProductsPage = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, dataFields]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getProductPage = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([rows, fieldData]) => {
            const product = rows[0];
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, dataFields]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => console.log(err));
};

exports.getCartPage = (req, res, next) => {
    Cart.getCart()
        .then(([rows, dataFields]) => {
            const total = rows.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: rows,
                total: (Math.round(total * 100) / 100).toFixed(2),
            });
        })
        .catch((err) => console.log(err));
};

exports.postCartPage = (req, res, next) => {
    const prodId = req.body.productId;
    Cart.addProduct(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
};

exports.postCartDeleteProductPage = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(([rows, dataFields]) => {
            Cart.deleteProduct(prodId);
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
};

exports.getOrdersPage = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};

exports.getCheckoutPage = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
