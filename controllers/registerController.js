const SITE_TITLE = 'Shope';
const User = require('../models/user')

module.exports.index = (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    } else {
        // render products.html from views
        response.render('register', {
            site_title: SITE_TITLE,
            title: 'Register'
        });
    }
}
module.exports.submit = (request, response) => {
    const user = new User({
        username: request.body.username,
        email: request.body.email,
        birthdate: request.body.birthdate,
        password: request.body.password,
        
        
    });
    user.save().then(() => {
        console.log('success')
        return response.render('registration-success');
    }, () => {
        console.log('failed')
        return response.render('registration-failed');
    });
}