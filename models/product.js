const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price, quantity) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    save() {
        return db.execute('INSERT INTO products (title,price,imageUrl,description,quantity) VALUES (?,?,?,?,?)', [this.title, this.price, this.imageUrl, this.description, this.quantity]);
    }

    static async editById(id, title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        return db.execute('UPDATE products SET title = ?,imageUrl = ?,description=?,price=?  WHERE products.id =? ', [title, imageUrl, description, price, id]);
    }

    static deleteById(id) {
        return db.execute('DELETE FROM products WHERE products.id=?', [id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id=?', [id]);
    }
};
