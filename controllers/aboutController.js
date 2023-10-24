const SITE_TITLE = 'Shope';

module.exports = (request, response) => {
    // if a user is logged in
    if (request.session.userId) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }else{
        // render products.html from views
        response.render('about',{
            site_title: SITE_TITLE,
            title: 'About'
        });
    }
}