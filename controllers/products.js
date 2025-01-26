exports.getAddProductPage = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
};

const products = [];

exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProductsPage = (req, res) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
    });
};
