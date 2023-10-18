const SITE_TITLE = 'Shope';
module.exports.index = (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }else{
        // render products.html from views
        response.render('product',{
            site_title: SITE_TITLE,
            title: 'Product'
        });
    }
}
module.exports.details = (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }else{
        // render products.html from views
        response.render('product-details',{
            site_title: SITE_TITLE,
            title: 'Product-details'
        });
    }
}