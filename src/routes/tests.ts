import express, {Express} from "express";
import {DBType} from "../db/db";

export const getTestRouter = ( db) => {
    const testRouter = express.Router()
    testRouter.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(204)
    })
    return testRouter
}

