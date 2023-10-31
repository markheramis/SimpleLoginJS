const SITE_TITLE = 'Shope';
const User = require('../models/user')
module.exports.index = (request, response) => {
    response.render('login', {
        site_title: SITE_TITLE,
        title: 'Login'
    });
}
module.exports.submit = async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });

        if (!user) {
            return response.status(400).send('Invalid email'); // 400 Bad Request
        }

        user.comparePassword(request.body.password, (error, valid) => {
            if (error) {
                return response.status(403).send('Forbidden'); // 403 Forbidden
            }

            if (!valid) {
                return response.status(400).send('Invalid password'); // 400 Bad Request
            }

            request.session.userId = user.id;
            response.redirect('/dashboard');
        });

    } catch (error) {
        return response.status(500).send(error.message); // 500 Internal Server Error
    }
}