//   BUSINESS LAYER

import {productsRepository} from "../repositories/products-db-repository";

export type ProductType = {
    id: number | string
    title: string
}

export const productsServiceBLL = {
    async findProducts(title: string | null | undefined): Promise<any> {
            return productsRepository.findProducts(title)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {id: +(new Date()), title: title}
      const createdNewProduct =   await productsRepository.createProduct(newProduct)
        return createdNewProduct
    },
    async findProductById(id: number): Promise<ProductType | null | any> {
        let product = await productsRepository.findProductById(id)
            return product
    },
    async updateProduct(id: number | string, title: string): Promise<boolean> {
        return  await productsRepository.updateProduct(id, title)
    },
    async deleteProduct(id: number) {
        return  await productsRepository.deleteProduct(id)
    }
}
