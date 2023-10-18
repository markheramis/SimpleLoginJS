const SITE_TITLE = 'Shope';
module.exports.index = (request, response) => {
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
module.exports.submit = (request, response) => {
    // loop through all users to see if the one of the user from the users array matches with the request body
    for(var i = 0; i < users.length; i++) {
        let username = users[i].username;
        let password = users[i].password;
        if(request.body.username == username && request.body.password == password) {
            request.session.login = username;
            console.log(users[i]);
            return response.render('login-succes');
        }
    }
    return response.render('login-failed');
}