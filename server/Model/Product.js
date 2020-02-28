const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Employee schema
let Product = new Schema({
name: {
type: String
},
description: {
type: String
},
reviews: {
    client_name: { type: String},
    review_comment: { type: String },
    stars: { type: Number }
    },
size: {type: Number},
color: {type: String},
stock: {type: Boolean},
current_price: {
type: Number
},
old_price: {
    type: Number
    }
},{
collection: 'products',
versionKey: false
});

module.exports = mongoose.model('Product', Product);