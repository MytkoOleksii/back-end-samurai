import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../type";
import {QueryCoursesModel} from "../models/QueryCoursesModel";
import express, {Request, Response} from "express";
import {CourseViewModel} from "../models/CourseViewModel";
import {URLParamsCourseIdModel} from "../models/URLParamsCourseldModel";
import {CourseCreateModel} from "../models/CourseCreateModel";
import {DBType} from "../db/db";

export type CourseType = {
    id: number
    title: string
    studentsCount: number
}
export const getCourseViewModal = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

export const getCoursesRouter = (db: DBType) => {
    const coursesRouter = express.Router() // Используется вместо app

    coursesRouter.route('/')
        .get((req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
            let foundCourses = db.courses;
            if (req.query.title) {// Поиск по queryParams "?name="
                foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1) // поиск подстроки с помощью indexOf
            }
            res.json(foundCourses.map(getCourseViewModal)) //new
        })
        .post((req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
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
            res.status(201).json(getCourseViewModal(createdNewCourse))
            /* res.status(201).json({// OLD
                 id: createdNewCourse.id,
                 title: createdNewCourse.title
             })*/
        })
    coursesRouter.route('/:id')
        .get( (req: RequestWithParams<URLParamsCourseIdModel>, res: Response) => {
            let foundCourse = db.courses.find(c => c.id === +req.params.id)

            if (!foundCourse) {
                res.sendStatus(404)
                return;
            }
            res.json(getCourseViewModal(foundCourse))
            /* res.json({ //old
                 id: foundCourse.id,
                 title: foundCourse.title
             })*/
        })
        .put( (req: Request<{ id: string }, {}, { title: string }>, res: any) => {
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
        .delete( (req: Request<{ id: string }>, res: any) => {
            db.courses = db.courses.filter(c => c.id !== +req.params.id)
            res.sendStatus(204)
        })
    return coursesRouter
}


// old 2
/*export const getCoursesRouter = (db: DBType) => {
 const coursesRouter = express.Router() // Используется вместо app
    coursesRouter.get('/', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
        let foundCourses = db.courses;
        if (req.query.title) {// Поиск по queryParams "?name="
            foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1) // поиск подстроки с помощью indexOf
        }
        res.json(foundCourses.map(getCourseViewModal)) //new
    })
    coursesRouter.get('/:id', (req: RequestWithParams<URLParamsCourseIdModel>, res: Response) => {
        let foundCourse = db.courses.find(c => c.id === +req.params.id)

        if (!foundCourse) {
            res.sendStatus(404)
            return;
        }
        res.json(getCourseViewModal(foundCourse))
        /!* res.json({ //old
             id: foundCourse.id,
             title: foundCourse.title
         })*!/
    })
    coursesRouter.post('/', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
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
        res.status(201).json(getCourseViewModal(createdNewCourse))
        /!* res.status(201).json({// OLD
             id: createdNewCourse.id,
             title: createdNewCourse.title
         })*!/
    })
    coursesRouter.put('/:id', (req: Request<{ id: string }, {}, { title: string }>, res) => {
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
    coursesRouter.delete('/:id', (req: Request<{ id: string }>, res) => {
        db.courses = db.courses.filter(c => c.id !== +req.params.id)
        res.sendStatus(204)
    })
    return coursesRouter
}*/


/* // OLD
export const getCoursesRouter = (app: Express, db) => {
    app.get('/courses', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
        let foundCourses = db.courses;
        if (req.query.title) {// Поиск по queryParams "?name="
            foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1) // поиск подстроки с помощью indexOf
        }
        res.json(foundCourses.map(getCourseViewModal)) //new
    })
    app.get('/courses/:id', (req: RequestWithParams<URLParamsCourseIdModel>, res: Response) => {
        let foundCourse = db.courses.find(c => c.id === +req.params.id)

        if (!foundCourse) {
            res.sendStatus(404)
            return;
        }
        res.json(getCourseViewModal(foundCourse))
        /!* res.json({ //old
             id: foundCourse.id,
             title: foundCourse.title
         })*!/
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
        res.status(201).json(getCourseViewModal(createdNewCourse))
        /!* res.status(201).json({// OLD
             id: createdNewCourse.id,
             title: createdNewCourse.title
         })*!/
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
    app.delete('/courses/:id', (req: Request<{ id: string }>, res) => {
        db.courses = db.courses.filter(c => c.id !== +req.params.id)
        res.sendStatus(204)
    })
}*/
