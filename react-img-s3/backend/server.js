const express = require("express");
const mongoose = require('mongoose');
const indexImg = require("./routes/index-route");
const bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use("/api", indexImg);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(
        process.env.DB_TEMPORARY,
        { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => {
        app.listen(process.env.PORT || 5000, () => console.log("Server is running on port 5000"));
    })
    .catch(err => {
        console.log(err);
    })
    ;