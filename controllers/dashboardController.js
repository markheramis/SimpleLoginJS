const SITE_TITLE = 'Shope';
module.exports = (request, response) => {
    // if request session login is empty (meaning no user is logged in)
    if (!request.session.login) {
        // redirect to index
        return response.redirect('/');
    }
    // else render dashboard
    return response.render('dashboard');
}