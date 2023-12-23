import {productsCollectionDb} from "../db/db";
import {WithId} from "mongodb";

const __products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
export type ProductType = {
    id: number | string
    title: string
}
export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<any> {
const filter:any = {}
        if (title) {
            filter.title = {$regex: title}

// old
            return  productsCollectionDb.find({title: {$regex: title}}).toArray()
        } else {
            return productsCollectionDb.find({}).toArray()
        }
     /*   return productsCollectionDb.find({filter}).toArray()*/
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {id: +(new Date()), title: title}
        await productsCollectionDb.insertOne(newProduct)
        return newProduct
    },
    async findProductById(id: number): Promise<ProductType | null | any> {
        let product = await productsCollectionDb.findOne({id: id})
        if (product) {
            return product
        } else {
            return null
        }
    },
    async updateProduct(id: number | string, title: string): Promise<boolean> {
     const result = await productsCollectionDb.updateOne({id:id},{$set: {title:title}})
      return result.matchedCount === 1
    },
    async deleteProduct(id: number) {
        let result = await productsCollectionDb.deleteOne({id: id})
        return result.deletedCount === 1
    }
}
