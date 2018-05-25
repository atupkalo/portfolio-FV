/**
 * Created by Anatoliy Tupkalo on 4/27/2018.
 */
const mongoose = require('mongoose');
const sls = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    refer: {
        type: String,
        required: true
    },
    sliderImg: {
        type: String,
        required: true
    }
});
mongoose.model('slider', sls);

