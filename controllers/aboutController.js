const SITE_TITLE = 'Shope';

module.exports = (request, response) => {
    // if a user is logged in
    if (request.session.userId) {
        response.redirect('about',{
            site_title: SITE_TITLE,
            title: 'About'
        });
    }else{
        // render products.html from views
        response.render('about',{
            site_title: SITE_TITLE,
            title: 'About'
        });
    }
}