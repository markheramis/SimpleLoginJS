const SITE_TITLE = 'Shope';
const multer = require('multer');
const Product = require('../models/product');
var fileUpload = require('../middleware/upload-middleware');
module.exports.index = async (request, response) => {
    // if a user is logged in
    if (request.session.userId) {
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
    if (request.session.userId) {
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
    if (request.session.userId) {
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
    var upload = multer({
        storage: fileUpload.files.storage(),
        allowedFile: fileUpload.files.allowedFile
    }).single('image');
    upload(request, response, function (err) {
        // Checking if the error is an instance of MulterError, which would indicate 
        // an error specifically related to the file upload process, e.g. 
        // the file is too large, no file was attached, etc.
        if (err instanceof multer.MulterError) {
            // Sending the multer error to the client
            response.send(err);
        } else if (err) { // If there's another kind of error (not a MulterError), then handle it here
            // Sending the generic error to the client
            response.send(err);
        } else { // If no errors occurred during the file upload, continue to the next step
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
    });
}
module.exports.update = async (request, response) => {
    const productId = request.params.productId
    if (request.session.userId) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }
    try {
        const product = await Product.findById(productId).exec();

        if (product) {
            response.render('product-update', {
                site_title: SITE_TITLE,
                title: 'Product Update',
                product: product
            });
        } else {
            //redirect to 404 page
            return response
                .status(err.status ||404)
                .render('404', { err: err });
        }
    } catch (err) {
        //redirect to 500 page
        return response
            .status(err.status || 500)
            .render('500', { err: err });
    }
}
module.exports.doUpdate = (request, response) => {
    var upload = multer({
        storage: fileUpload.files.storage(),
        allowedFile: fileUpload.files.allowedFile
    }).single('image');
    upload(request, response, async function (err) {
        // Checking if the error is an instance of MulterError, which would indicate 
        // an error specifically related to the file upload process, e.g. 
        // the file is too large, no file was attached, etc.
        if (err instanceof multer.MulterError) {
            // Sending the multer error to the client
            response.send(err);
        } else if (err) { // If there's another kind of error (not a MulterError), then handle it here
            // Sending the generic error to the client
            response.send(err);
        } else { // If no errors occurred during the file upload, continue to the next step
            const imageUrl = `/public/uploads/${request.file.filename}`;
            const productId = request.params.productId
            try {
                // this is the new updated product properties
                const updatedData = {
                    name: request.body.name,
                    description: request.body.description,
                    price: request.body.price,
                    note: request.body.note,
                    category: request.body.category,
                    stockQuantity: request.body.stockQuantity,
                    imageURL: imageUrl,
                    isAvailable: request.body.isAvailable == 'on'
                };
                // functions both as find (productId) and update (updateData).
                const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
                    new: true  // This option returns the updated document
                })
                if (updatedProduct) {
                    // redirect back to the product page
                    response.redirect("/product");
                } else {
                    // redirect to 404 error Page (product-404.ejs)
                    return response
                        .status(404)
                        .render('404', { err: err });
                }

            } catch (err) {
                console.log("Error!", err);
                // redirect to error Critical Error Page (error-500.ejs)
                return response
                    .status(err.status || 500)
                    .render('500', { err: err });
            }

        }
    });
}