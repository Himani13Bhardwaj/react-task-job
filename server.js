"use strict";
var express = require('express');
//var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var fs = require('fs');
var JobList, JobDetails;
fs.readFile('response/response.json', 'utf8', function (err, data) {
    if (err) throw err;
    JobList = JSON.parse(data);
});

fs.readFile('response/jobdetails.json', 'utf8', function (err, data) {
    if (err) throw err;
    JobDetails = JSON.parse(data);
});


app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'build'));
app.use('/', express.static('./', { index: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build'));
});
app.get('/getJobList', function (req, res) {
    res.json(JobList)
});
app.get('/getJobDeatils', function (req, res) {
    res.json(JobDetails)
});
app.get('/:name', function (req, res) {
    res.sendFile(path.join(__dirname, 'build'));
});
app.get('*', function (req, res) {
    console.log(path.join(__dirname, 'build'));
    res.sendFile(path.join(__dirname, 'build'));
});
app.use(express.static(path.join(__dirname, 'build')));
app.listen(3000, 'localhost', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Listening at http://localhost:3000');
});