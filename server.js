var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path');
    cors = require('cors');
    firebase = require("firebase");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/app'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(8080);
console.log('src is running on 8080');