const db = require('../util/database');

module.exports = class Cart {
    static async addProduct(id) {
        const [quantityObj, _] = await db.execute('SELECT quantity FROM products WHERE products.id=?', [id]);
        const newQuantity = quantityObj.at(0).quantity + 1;
        return db.execute('UPDATE products SET quantity = ? WHERE products.id =? ', [newQuantity, id]);
    }

    static async deleteProduct(id) {
        const [quantityObj, _] = await db.execute('SELECT quantity FROM products WHERE products.id=?', [id]);
        const newQuantity = Math.max(quantityObj.at(0).quantity - 1, 0);
        return db.execute('UPDATE products SET quantity = ? WHERE products.id =? ', [newQuantity, id]);
    }

    static getCart() {
        return db.execute('SELECT * FROM products WHERE products.quantity>0');
    }
};
