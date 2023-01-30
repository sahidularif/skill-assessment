const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBilling = new Schema({
    name: String,
    email: String,
    phone: String,
    paid: Number,
}, { timestamps: false });

module.exports = mongoose.model('Billings', newBilling)
