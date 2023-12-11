"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*const express = require('express')*/ // old
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    var a = 4;
    if (a > 5) {
        res.send('OK less 5');
    }
    else {
        res.send('Hello World!');
    }

});
app.get('/users', function (req, res) {
    res.send('Hello User!!!!!');
});
app.post('/users', function (req, res) {
    res.send('We have created new user!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
