const Product = require('../models/product')
const slugify = require('slugify')


exports.create = async (req, res) => {
    try {
        console.log(req.body)
        req.body.slug = slugify(req.body.title)
        const newProduct = await new Product(req.body).save()
        res.json(newProduct)
    } catch (err) {
        console.log('err create ---->', err)
        // res.status(400).send('Error create product')
        res.status(400).json({
            err: err.message
        })
    }
}

exports.read = async (req, res) => {
    try {
        let product = await Product.find({})
        res.json(product)
    } catch (err) {
        console.log('err read ---->', err)
        // res.status(400).send('Error create product')
        res.status(400).json({
            err: err.message
        })
    }
}