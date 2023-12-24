// DAL -  DATA ACCESS LAYER
import {productsCollectionDb} from "../db/db";

//const __products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
export type ProductType = {
    id: number | string
    title: string
}
export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<any> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
            // OLD 1
            /*   return productsCollectionDb.find({filter}).toArray()*/
            // OLD 2
            /* return  productsCollectionDb.find({title: {$regex: title}}).toArray() // з бази данних*/
        } else {
            return productsCollectionDb.find({}).toArray()
        }

    },
    async createProduct(newProduct: ProductType): Promise<ProductType> {
        await productsCollectionDb.insertOne(newProduct)
        return newProduct
    },
    async findProductById(id: number): Promise<ProductType | null | any> {
        return await productsCollectionDb.findOne({id: id})// шукає по бд
    },
    async updateProduct(id: number | string, title: string): Promise<boolean> {
        const result = await productsCollectionDb.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number) {
        let result = await productsCollectionDb.deleteOne({id: id})
        return result.deletedCount === 1
    }
}
