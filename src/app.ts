import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {CourseViewModel} from "./models/CourseViewModel";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "./type";
import {QueryCoursesModel} from "./models/QueryCoursesModel";
import {URLParamsCourseIdModel} from "./models/URLParamsCourseldModel";
import {CourseCreateModel} from "./models/CourseCreateModel";
import {getCoursesRouter} from "./routes/courses";
import {db} from "./db/db";
import {getTestRouter} from "./routes/tests";

export const app = express()
export const parserMiddleware = bodyParser()
export const jsonBodyMiddleware = express.json()
//const corsMiddleware = cors();
//app.use(corsMiddleware)

app.use(parserMiddleware)
app.use(jsonBodyMiddleware)

//let path = require('path') // 5/6
//let catalog = '../pages'     // 5/6
//app.use('/', express.static(path.join(__dirname,catalog))); // 6

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
        //res.sendFile(path.join(__dirname,catalog,'home.html')) //5 1)Добавить let path =require('path') 2)вместо "catalog" написать папки расположения файла 3)Указать файл
    }
})

app.get('/users', (req, res) => {
    res.send('Список пользователей: ')
})
app.post('/users', (req, res) => {
    res.send('We have created new user!')
})

app.use('/courses', getCoursesRouter(db))
app.use('/__test__/',getTestRouter(db) )

/*  // OLD

const coursesRouter = getCoursesRouter(db)
app.use('/courses', coursesRouter)

const testRouter = getTestRouter(db)
app.use('/__test__/', testRouter)
*/



