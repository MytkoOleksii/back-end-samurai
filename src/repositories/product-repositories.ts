const products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export type ProductType = {
    id: number
    title: string
}

export const productsRepository = {
    async findProducts(title: string | null | undefined) {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
    async createProduct(title: string): Promise<ProductType[]> {
        const newProduct = {id: +(new Date()), title: title}
        products.push(newProduct)
        return newProduct
    },
    findProductById(id: number) {
        return products.find(p => p.id === id)
    },
   async updateProduct(id: number | string, title: string) {
        let product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            } else {
                return false
            }
        }
    }
};
