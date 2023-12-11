"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express')  // old
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//import cors from 'cors'
const app = (0, express_1.default)();
//const corsMiddleware = cors();
//app.use(corsMiddleware)
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3000;
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devops' },
    ],
};
app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('OK less 5');
    }
    else {
        res.send({ message: 'hello World. Monday' });
    }
});
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) { // Поиск по queryParams "?name="
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1); // поиск подстроки с помощью indexOf
    }
    res.json(foundCourses);
});
app.get('/courses/:id', (req, res) => {
    let foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        res.sendStatus(400);
        return;
    }
    let createdNewCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdNewCourse);
    res.status(201).json(createdNewCourse);
});
app.post('/users', (req, res) => {
    res.send('We have created new user!');
});
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        res.sendStatus(400);
        return;
    }
    let foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(204).json(foundCourse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/* method POST
fetch('http://localhost:3000/courses', { method: 'post', body: JSON.stringify({title: 'Hi'}),
    headers: {
        'content-type': 'application/json'
    }})
.then(res => res.json())
.then(json => console.log(json))
 */ 
