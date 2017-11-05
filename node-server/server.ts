/// <reference path="../src/typings.d.ts" />

let express = require('express');
// let staticRoot = __dirname;
let path = require('path');
let rootPath = path.normalize(__dirname + '/../');
// for file uploads
let formidable = require('formidable');
let bodyParser = require('body-parser');


let app = express();
app.use(require('body-parser').urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(rootPath, '/dist')));

app.get('*', function(req, res) {
    res.sendFile(rootPath + 'dist/index.html');
});


app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
  next();
});

app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});
