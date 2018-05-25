const mongoose = require('mongoose');
const ss = new mongoose.Schema({
    html: {
     type: String,
     required: true
    },
     css: {
     type: String,
     required: true
    },
    js: {
        type: String,
        required: true
    },
    php: {
        type: String,
        required: true
    },
    sgl: {
        type: String,
        required: true
    },
    wp: {
        type: String,
        required: true
    },
    node: {
        type: String,
        required: true
    },
    git: {
        type: String,
        required: true
    },
    gulp: {
        type: String,
        required: true
    },
    wbp: {
        type: String,
        required: true
    }
});

mongoose.model('skills', ss);
