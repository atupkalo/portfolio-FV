/**
 * Created by Anatoliy Tupkalo on 4/13/2018.
 */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const mongo_connect =  require('./mongo.config');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const send = require('./helper/transporter');

require('./db_model/blog');
const blog = mongoose.model('blog');

require('./db_model/skills');
const skills = mongoose.model('skills');

require('./db_model/slider');
const slider = mongoose.model('slider');

const storage = multer.diskStorage({
    filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
     },
    destination: './public/uploads'
});

const upload = multer({
    storage: storage
}).single('blogImg');


mongoose.connect(mongo_connect, null, function(err){
    if(err){console.log(err)
    }else{console.log('db ic connected')}
});

app.use(express.static(path.join (__dirname, '/public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile('index.html');
});

app.post('/upload', function(req, res){
    upload(req, res, function(err){
        if(err){
            console.log(err);
            res.status(500).end(err.message);
            return
        }else{
            res.send('uploads/' + req.file.filename);
        }
    });
});

//                                                            ------------------ skills
app.post('/skills', function(req, res){
   skills.findOne({_id: '5aec6dbfd15081400877c0ab'}).then((skills) => {
       for(let prop in req.body){
           if(req.body[prop]){
               skills[prop] = req.body[prop];
           }
       };
       skills.save().then(() => {res.status(200).send()}).catch((err) => {res.status(503).send(err.message)});;
   }).catch((err) => {res.status(503).send(err.message)});
});

app.get('/skills', function(req, res){
    skills.find().then((data) => {

        res.send(data);
    });
});

//                                                          ---------------------  blog
app.post('/blog', function(req, res){
    console.log(req.body);
    const entry = {
        title: req.body.title,
        text: req.body.text,
        img: req.body.img
    };
    new blog(entry).save().then(function(){
        res.status(200).send();
    });
});

app.get('/blog', function(req, res){
 blog.find().then(function(data){

     res.send(data);
 });
});

//                                                         --------------------  slider

app.post('/slider', function(req, res){
    new slider(req.body).save().then(function(data){
        res.send(data).then(() => {console.log('slider')})
    }).catch((err) => {
        console.log(err);

    });
});
app.get('/slider', function(req, res){
    slider.find().then((data) => {res.status(200).send(data)});
});
//                                                  -----------------------------contact-form

app.post('/contact', function(req, res){
    send(req.body)
        .then(() => send(req.body, true))
        .then(() => {res.status(200).send('ok')}).catch((err) => {
        console.log(err);
        res.status(503).send();
    });
});

app.listen(8000, function(){
    console.log('server is up');
});




