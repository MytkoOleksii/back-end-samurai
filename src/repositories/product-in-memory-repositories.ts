const products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
export type ProductType ={
    id: number | string
    title: string
}

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
async createProduct(title: string):Promise<ProductType> {
        const newProduct = {id: +(new Date()), title: title}
        products.push(newProduct)
        return newProduct
    },
    async findProductById(id: number):Promise<ProductType | null> {
        let product = products.find(p => p.id === id)
        if (product){
            return product
        }else {
            return null
        }
    },
   async updateProduct(id: number | string, title: string):Promise<boolean> {
        let product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number) {
        for(let i = 0; i < products.length; i++) {
            if(products[i].id === id) {
                products.splice(i, 1)
                return true
            } else {
                return false
            }
        }
    }
};
