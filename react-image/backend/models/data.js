const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Newimage = new Schema({
    name: {type: String, required: true},
    imageProfile: {type: String, required: true},
    images: {type: Array,  required: true}
});

module.exports = mongoose.model('user', Newimage);