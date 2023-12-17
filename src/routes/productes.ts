import express, {Response} from "express";
import {productsRepository} from "../repositories/product-repositories";


export const productsRouter = express.Router()

productsRouter.route('/')
    .get((req, res: Response) => {
        const foundProducts = productsRepository.findProducts(req.query.title?.toString())
        res.send(foundProducts)
    })
    .post((req, res: Response) => {
        const newProduct = productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRouter.route('/:id')
    .get((req, res: Response) => {
        let product = productsRepository.findProductById(+req.params.id)
        if (product) {
            res.send(product)
        } else {
            res.send(404)
        }
    })
    .put((req, res: Response) => {
        let isUpdated = productsRepository.updateProduct(req.params.id, req.body.title)
        if (isUpdated) {
            const product = productsRepository.findProductById(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    })
    .delete((req, res: Response) => {
        let isDeleted = productsRepository.deleteProduct(+req.params.id)
        if (isDeleted) {
            res.send(204)
        }
        res.send(404)
    })

/* OLD

export const productsRouter = express.Router()

productsRouter.route('/')
    .get((req, res: any) => {
        productsRepository.findProducts(req.query.title)
        if (req.query.title) {
            let searchString = req.query.title.toString()
            res.send(products.filter(p => p.title.indexOf(searchString) > -1))

        } else {
            res.send(products)
        }
    })
    .post((req, res: any) => {
        const newProducr = {id: +(new Date()), title: req.body.title}
        products.push(newProducr)
        res.status(201).send(newProducr)
    })
productsRouter.route('/:id')
    .get((req,res: any) => {
        let product = products.find(p => p.id === + req.params.id)
        if(product) {
            res.send(product)
        } else {
            res.send(404)
        }
    })
        .put((req, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
    .delete((req,res: Response) => {
       for (let i = 0; i < products.length; i++) {
           if(products[i].id === +req.params.id) {
               products.splice(i, 1)
               res.send(204)
               return
           }
       }
    })

    */
