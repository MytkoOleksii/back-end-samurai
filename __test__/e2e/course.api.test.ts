import request from "supertest";
import {app} from "../../index";
import {response} from "express";
import {CourseUpdateModel} from "../../src/models/CourseUpdateModel";

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })
    it('should  return 200', async () => {
        await request(app)
            .get('/courses')
            .expect(200, [])
    });
    it('should  return 404', async function () {
        await request(app).get('/courses/777')
            .expect(404)
    });

    it('should not  create', async function () {
        await request(app)
            .post('/courses')
            .send({title: ''})
            .expect(400)

    });
    let createCourse: any = null;
    it('should create', async function () {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'It-kamasutra'})
            .expect(201)

        createCourse = createResponse.body;

        expect(createCourse).toEqual({
            id: expect.any(Number) ,
            title: 'It-kamasutra',

        })

       await request(app)
            .get('/courses')
            .expect(200, [createCourse])
    });

    it('should update not exist', async function () {
        await request(app)
            .put(`/courses/` + createCourse.id)
            .send({title:''})
            .expect(400)

        await request(app)
            .get(`/courses/` + createCourse.id)
            .expect(200, createCourse)
    });
    it(`shouldn't update`, async function () {
        await request(app)
            .put(`/courses/` + 2)
            .send({title:'good'})
            .expect(404)
    });
    it('should update correct', async function () {
        const data: CourseUpdateModel = {title:'New course 777'}
        await request(app)
            .put(`/courses/` + createCourse.id)
            .send(data)
            .expect(204)

        await request(app)
            .get(`/courses/` + createCourse.id)
            .expect(200, {...createCourse,title: data.title})
    });

    it('should delete course', async function () {
        await request(app)
            .delete('/courses/' + createCourse.id)
            .expect(204)
    });
})