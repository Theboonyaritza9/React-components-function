const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());
app.use('/api', require('./routes/index'));
app.use('/uploads/images', express.static(path.join('uploads', 'images')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});


// app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });

const db1 = 'mongodb://localhost:27017/Images-react';

mongoose.connect(db1, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(5000);
        console.log('MongoDB connected..');
    })
    .catch(err => console.log(err));