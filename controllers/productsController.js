const SITE_TITLE = 'Shope';
const Product = require('../models/product');

module.exports.index = async (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    } else {
        const products = await Product.find();
        // render products.html from views
        response.render('product', {
            site_title: SITE_TITLE,
            title: 'Product',
            products: products
        });
    }
}
module.exports.details = (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    } else {
        // render products.html from views
        response.render('product-details', {
            site_title: SITE_TITLE,
            title: 'Product-details'
        });
    }
};
module.exports.create = (request, response) => {
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    } else {
        // render products.html from views
        response.render('product-create', {
            site_title: SITE_TITLE,
            title: 'Product Create'
        });
    }
};
module.exports.doCreate = (request, response) => {
    return response.json(request.body)
    if (!request.image) {
        return response.status(400).send('No image uploaded.');
      }
    const imageUrl = `/public/uploads/${request.file.filename}`;
    const product = new Product({
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        note: request.body.note,
        category: request.body.category,
        stockQuantity: request.body.stockQuantity,
        imageURL: imageUrl,
        isAvailable: request.body.isAvailable == 'on'
    }); 
      
      
    product.save().then(() => {
        console.log('success')
        return response.render('registration-success');
    }, (error) => {
        console.log(error)
        return response.render('registration-failed');
    });
}