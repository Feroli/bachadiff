/// <reference path="../src/typings.d.ts" />
var express = require('express');
// let staticRoot = __dirname;
var path = require('path');
var rootPath = path.normalize(__dirname + '/../');
// for file uploads
var formidable = require('formidable');
var bodyParser = require('body-parser');
var app = express();
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(rootPath, '/dist')));
app.get('*', function (req, res) {
    res.sendFile(rootPath + 'dist/index.html');
});
app.use(function (req, res, next) {
    console.log('Looking for URL : ' + req.url);
    next();
});
app.listen(app.get('port'), function () {
    console.log('app running on port', app.get('port'));
});
