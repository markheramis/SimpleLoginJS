const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
var path = require('path');

const app = express();
//testing database
const dbConnect = require('./database/dbConnect');
const conn = dbConnect();

//testing database

app.use(session({secret:'sessionsecret777'}));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'));

app.use(function (request, response, next) {
    request.db = conn;
    next();
  });
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

require('./routes/web')(app);


app.listen(8080,()=>{
    console.log("Server listening at port 8080");
})