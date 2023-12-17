"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const pages_1 = require("../../pages");
describe('/course', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(pages_1.app).delete('/__test__/data');
    }));
    it('should  return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(pages_1.app)
            .get('/courses')
            .expect(200, []);
    }));
    it('should  return 404', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(pages_1.app).get('/courses/777')
                .expect(404);
        });
    });
    it('should not  create', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(pages_1.app)
                .post('/courses')
                .send({ title: '' })
                .expect(400);
        });
    });
    let createCourse = null;
    it('should create', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const createResponse = yield (0, supertest_1.default)(pages_1.app)
                .post('/courses')
                .send({ title: 'It-kamasutra' })
                .expect(201);
            createCourse = createResponse.body;
            expect(createCourse).toEqual({
                id: expect.any(Number),
                title: 'It-kamasutra'
            });
            yield (0, supertest_1.default)(pages_1.app)
                .get('/courses')
                .expect(200, [createCourse]);
        });
    });
    it('should update not exist', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(pages_1.app)
                .put(`/courses/` + createCourse.id)
                .send({ title: '' })
                .expect(400);
            yield (0, supertest_1.default)(pages_1.app)
                .get(`/courses/` + createCourse.id)
                .expect(200, createCourse);
        });
    });
    it(`shouldn't update`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(pages_1.app)
                .put(`/courses/` + 2)
                .send({ title: 'good' })
                .expect(404);
        });
    });
    it('should update correct', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(pages_1.app)
                .put(`/courses/` + createCourse.id)
                .send({ title: 'New course 777' })
                .expect(204);
            yield (0, supertest_1.default)(pages_1.app)
                .get(`/courses/` + createCourse.id)
                .expect(200, Object.assign(Object.assign({}, createCourse), { title: 'New course 777' }));
        });
    });
    it('should delete course', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(pages_1.app)
                .delete('/courses/' + createCourse.id)
                .expect(204);
        });
    });
});
