//import express = require('express')  // old
import express from 'express'

//import bodyParser from 'body-parser'
import * as path from "path";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "./type";
import {QueryCoursesModel} from "./models/QueryCoursesModel";
import {CourseViewModel} from "./models/CourseViewModel";
import {CourseCreateModel, CourseCreateModel} from "./models/CourseCreateModel";
//import cors from 'cors'


export const app = express()
 //app.use(express.json())


//const corsMiddleware = cors();
//app.use(corsMiddleware)

//const parserMiddleware = bodyParser()
//app.use(parserMiddleware)

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3005

type CourseType = {
    id: number
    title: string
    studentsCount: number
}
const db: { courses: CourseType[] } = {
    courses: [
        {id: 1, title: 'front-end', studentsCount: 10},
        {id: 2, title: 'back-end', studentsCount: 10},
        {id: 3, title: 'automation qa', studentsCount: 10},
        {id: 4, title: 'devops', studentsCount: 10},
    ],
}

app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('OK less 5')
    } else {
        //res.send({message:'hello World. Monday'}) // OLD
        //res.sendFile( path.resolve('pages', 'home.html'))   //1
        //res.sendFile( path.resolve('pages/home.html'));     //2
        //res.sendFile( `${process.cwd()}/pages/home.html` ); //3 process.cwd()возвращает абсолютный путь вашего проекта.
        res.sendFile("./pages/home.html", {root: "./"}); //4
    }

})
app.get('/courses', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;
    if (req.query.title) {// Поиск по queryParams "?name="
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1) // поиск подстроки с помощью indexOf
    }
    res.json(foundCourses.map(dbCourse => {
        return {
            id: dbCourse.id,
            title: dbCourse.title,
        }
    }))
})
app.get('/courses/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
    let foundCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(404)
        return;
    }
    res.json({
        id: foundCourse.id,
        title: foundCourse.title
    })
})
app.post('/courses', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        res.sendStatus(400)
        return;
    }
    let createdNewCourse = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 0,
    }
    db.courses.push(createdNewCourse)
    res.status(201).json(createdNewCourse)
})
app.post('/users', (req, res) => {
    res.send('We have created new user!')
})
app.delete('/courses/:id', (req: Request<{ id: string }>, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id)
    res.sendStatus(204)
})
app.put('/courses/:id', (req: Request<{ id: string }, {}, { title: string }>, res) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        res.sendStatus(400)
        return;
    }
    let foundCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(404)
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(204).json(foundCourse)
})

app.delete('/__test__/data', (req,res) => {
    db.courses = [];
    res.sendStatus(204)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/* method POST
fetch('http://localhost:3000/courses', { method: 'post', body: JSON.stringify({title: 'Hi'}),
    headers: {
        'content-type': 'application/json'
    }})
.then(res => res.json())
.then(json => console.log(json))
 */