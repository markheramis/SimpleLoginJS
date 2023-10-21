const SITE_TITLE = 'Shope';
const multer = require('multer');


const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const loginController = require('../controllers/loginController');
const productsController = require('../controllers/productsController');
const registerController = require('../controllers/registerController');
const dashboardController = require('../controllers/dashboardController');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
module.exports = function(app){
    
    app.get('/', homeController);

    app.get('/about', aboutController);

    app.get('/login', loginController.index);
    app.post('/login', loginController.submit);
    app.get('/register', registerController.index);
    app.post('/register', registerController.submit);

    app.get('/product', productsController.index);
    app.get('/product/create', productsController.create);
    app.post('/product/create', upload.single('image'), productsController.doCreate);
    app.get('/product-details', productsController.details);
    
    app.get('/dashboard', dashboardController);
}
