import {CourseType} from "../routes/courses";
import {MongoClient} from "mongodb";
import {ProductType} from "../repositories/products-db-repository";

export type DBType = { courses: CourseType[]}

/*export const db: DBType = {
    courses: [
        {id: 1, title: 'front-end', studentsCount: 10},
        {id: 2, title: 'back-end', studentsCount: 10},
        {id: 3, title: 'automation qa', studentsCount: 10},
        {id: 4, title: 'devops', studentsCount: 10},
    ],
}*/

const mongoUrl = process.env.mongoURL || "mongodb+srv://Admin:9Pw5eYCxjiAf7H3S@cluster0.dy9y5gg.mongodb.net/?retryWrites=true&w=majority"
export const client = new MongoClient(mongoUrl)
// client.db('loarning').collection<ProductType>('product')  // whole adress
export const db = client.db('loarning')
export let productsCollectionDb = db.collection('product')

//export let productsCollectionDb = client.db('loarning').collection<ProductType>('product')

export const runDb = async () => {

        await client.connect()// Connect the client to server
        // Establish and verify connection
        await client.db('products').command({ping:1})
        console.log("successfull")

         client.close();

}