var mongoose = require("mongoose");


var schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        get: value => (value / 100).toFixed(2),
        set: value => value * 100
    },
    note: {
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['Electronics', 'Apparel', 'Home and Kitchen', 'Books', 'Others'],
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    imageURL: {
        type: String,
        trim: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);
schema.set('toJSON', { getters: true });

module.exports = mongoose.model('Product', schema);