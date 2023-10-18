const SITE_TITLE = 'Shope';
module.exports.index = (request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }else{
        // render products.html from views
        response.render('register',{
            site_title: SITE_TITLE,
            title: 'Register'
        });
    }
}
module.exports.submit = (request, response) => {
    // get the number of users before doing the add (or push)
    let usersBeforeAdd = users.length;
    /**
     * Get username and password from the request body
     */
    let username = request.body.username;
    let password = request.body.password;
    // get the number of users after doing the add (or push)
    let usersAfterAdd = users.push({
        username: username,
        password: password
    })
    // if number of users before add is less than the number of users after add
    if(usersBeforeAdd < usersAfterAdd) {
        // our push command succeeded
        console.log(users)
        return response.render('registration-success');
    } else {
        // our push command failed
        return response.render('registration-failed');
    }
}