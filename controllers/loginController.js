const SITE_TITLE = 'Shope';
module.exports = (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }else{
        // render products.html from views
        response.render('login',{
            site_title: SITE_TITLE,
            title: 'Login'
        });
    }
}