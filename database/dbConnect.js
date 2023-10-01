const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
    const conn = mongoose.connect('mongodb://127.0.0.1/monmonmon');
    console.log('database connected');
}
    catch (error) {
        console.log('database error');
    }
};
module.exports = dbConnect;