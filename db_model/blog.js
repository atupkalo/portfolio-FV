/**
 * Created by Anatoliy Tupkalo on 4/13/2018.
 */
const mongoose = require('mongoose');
const bs = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    }
});

mongoose.model('blog', bs);
