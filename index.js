const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
var path = require('path');
const app = express();

app.use(session({secret:'sessionsecret777'}));
app.use(bodyparser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'));

// This is the user array
var users = [
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'normal',
        password: 'normal'
    },
    {
        username: 'niko',
        password: 'niko'
    }
]

app.get('/',(request, response) => {
    // if a user is logged in
    if (request.session.login) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }else{
        // render index
        response.render('index');
    }
})
app.post('/login',(request, response) => {
    // loop through all users to see if the one of the user from the users array matches with the request body
    for(var i = 0; i < users.length; i++) {
        let username = users[i].username;
        let password = users[i].password;
        if(request.body.username == username && request.body.password == password) {
            request.session.login = username;
            return response.render('login-success');
        }
    }
    return response.render('login-failed');
})
app.post('/register', (request, response) => {
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
        return response.render('registration-success');
    } else {
        // our push command failed
        return response.render('registration-failed');
    }
});
app.get('/dashboard', (request, response) => {
    // if request session login is empty (meaning no user is logged in)
    if (!request.session.login) {
        // redirect to index
        response.redirect('/');
    }
    // else render dashboard
    response.render('dashboard');
})
app.listen(8080,()=>{
    console.log("Server listening at port 8080");
})