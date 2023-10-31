const SITE_TITLE = 'Shope';
const User = require('../models/user')

module.exports.index = async (request, response) => {
    const users = await User.find();
    response.render('user-list', {
        site_title: SITE_TITLE,
        title: 'User List',
        users: users
    });
}
module.exports.view = async (request, response) => {
    const userId = request.params.userId
    if (request.session.userId) {
        // redirect to dashboard
        response.redirect('/dashboard');
    }
    try {
        const user = await User.findById(userId).exec();

        if (user) {
            response.render('user-view', {
                site_title: SITE_TITLE,
                title: 'User View',
                user: user
            });
        } else {
            //redirect to 404 page
        }
    } catch (err) {
        //redirect to 500 page
        //console.error('Error occurred:', err);
    }
}
module.exports.update = async (request, response) => {
    const userId = request.params.userId
    try {
        const updatedData = {
            username: request.body.username,
            email: request.body.email,
            birthdate: request.body.birthdate,
            password: request.body.password
        };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true  // This option returns the updated document
        })
        if (updatedUser) {
            console.log('Success');
            return response.render('registration-success');
        } else {
            console.log('Update failed');
            return response.render('registration-failed');
        } 
} catch (err) {
    console.log("Error!", err);
}

}
