const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');

var path = require('path');
const ex = express();


var username = 'admin';
var password = 'admin';

ex.use(session({secret:'sessionsecret777'}));
ex.use(bodyparser.urlencoded({extended:true}));
ex.engine('html', require('ejs').renderFile);
ex.set('view engine','html');
ex.use('/public', express.static(path.join(__dirname, 'public')))
ex.set('views', path.join(__dirname, '/views'));

ex.post('/',(req,res)=>{
    if(req.body.username == username && req.body.password == password){
        req.session.login = username;
        res.render('success');
    }else{
        res.render('index');
    }
})

ex.get('/',(req, res)=>{
    if(req.session.login){
        res.render('success');
    }else{
        res.render('index');
    }
})

ex.listen(8080,()=>{
    console.log("Server tá on");
})