"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//const express = require('express')  // old
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//import cors from 'cors'
exports.app = (0, express_1.default)();
//const corsMiddleware = cors();
//app.use(corsMiddleware)
const parserMiddleware = (0, body_parser_1.default)();
exports.app.use(parserMiddleware);
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3000;
const db = {
    courses: [
        { id: 1, title: 'front-end', studentsCount: 10 },
        { id: 2, title: 'back-end', studentsCount: 10 },
        { id: 3, title: 'automation qa', studentsCount: 10 },
        { id: 4, title: 'devops', studentsCount: 10 },
    ],
};
const getCourseViewModal = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    };
};
//let path = require('path') // 5/6
//let catalog = '../pages'     // 5/6
//app.use('/', express.static(path.join(__dirname,catalog))); // 6
exports.app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('OK less 5');
    }
    else {
        //res.send({message:'hello World. Monday'}) // OLD
        //res.sendFile( path.resolve('pages', 'home.html'))   //1
        //res.sendFile( path.resolve('pages/home.html'));     //2
        //res.sendFile( `${process.cwd()}/pages/home.html` ); //3 process.cwd()возвращает абсолютный путь вашего проекта.
        res.sendFile("./pages/home.html", { root: "./" }); //4
        //res.sendFile(path.join(__dirname,catalog,'home.html')) //5 1)Добавить let path =require('path') 2)вместо "catalog" написать папки расположения файла 3)Указать файл
    }
});
exports.app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) { // Поиск по queryParams "?name="
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1); // поиск подстроки с помощью indexOf
    }
    res.json(foundCourses.map(getCourseViewModal)); //new
});
exports.app.get('/courses/:id', (req, res) => {
    let foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(getCourseViewModal(foundCourse));
    /* res.json({ //old
         id: foundCourse.id,
         title: foundCourse.title
     })*/
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        res.sendStatus(400);
        return;
    }
    let createdNewCourse = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 0,
    };
    db.courses.push(createdNewCourse);
    res.status(201).json(getCourseViewModal(createdNewCourse));
    /* res.status(201).json({// OLD
         id: createdNewCourse.id,
         title: createdNewCourse.title
     })*/
});
exports.app.post('/users', (req, res) => {
    res.send('We have created new user!');
});
exports.app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
exports.app.put('/courses/:id', (req, res) => {
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
exports.app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(204);
});
exports.app.listen(port, () => {
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
