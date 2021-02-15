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

exports.listAll = async (req, res) => {
    try {
        let products = await Product.find({})
            .limit(parseInt(req.params.counts))
            .populate('category')
            .populate('subs')
            .sort([['createdAt', 'desc']])
            .exec()
        res.json(products)
    } catch (err) {

    }
}