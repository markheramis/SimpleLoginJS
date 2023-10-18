const SITE_TITLE = 'Shope';

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const loginController = require('../controllers/loginController');
const productsController = require('../controllers/productsController');
const registerController = require('../controllers/registerController');
module.exports = function(app){
    
    app.get('/', homeController);

    app.get('/about', aboutController);

    app.get('/login', loginController)
    app.get('/register', registerController)
    
    
    app.get('/product', productsController)
    app.get('/product-details',(request, response) => {
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
    })
    
    app.post('/login',(request, response) => {
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
            console.log(users)
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
            return response.redirect('/');
        }
        // else render dashboard
        return response.render('dashboard');
    })
}
