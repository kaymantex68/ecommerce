const Product = require('../models/product')
const slugify = require('slugify')
const User = require('../models/user')
const { modelName } = require('../models/product')

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

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({ slug: req.params.slug }).exec()
        res.json(deleted)
    } catch (err) {
        console.log('delete error ----->', err)
        return res.status(400).send('Product delete error')
    }
}

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate('category')
        .populate('subs')
        .exec()
    res.json(product)
}

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec()
        res.json(updated)
    } catch (err) {
        console.log('update error ----->', err)
        return res.status(400).send('Product update error')
    }
}

// WITHOUT PAGINATION
// exports.list = async (req, res) => {
//     try {
//         const { sort, order, limit } = req.body
//         console.log(req.body)
//         const products = await Product.find({})
//             .populate('category')
//             .populate('subs')
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec()
//         res.json(products)
//     } catch (err) {
//         console.log('err create ---->', err)

//     }
// }

// WITH PAGINATION
exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page || 1
        const perPage = 3
        console.log(req.body)
        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])
            .limit(perPage)
            .exec()
        res.json(products)
    } catch (err) {
        console.log('err create ---->', err)

    }
}

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec()
    res.json(total)
}

exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec()
    const user = await User.findOne({ email: req.user.email }).exec()
    const { star } = req.body
    // who is updating?
    // check if currently logged in user have already addad rating to this product?
    let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString())
    // if user haven't left rating yet, push it 
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(product._id,
            {
                $push: { ratings: { star: star, postedBy: user._id } }
            },
            { new: true }
        ).exec()
        console.log('ratingAdded', ratingAdded)
        res.json(ratingAdded)
    } else {
        // if user have already left rating , update it 
        const ratingUpdate = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },

            },
            {
                $set: { "ratings.$.star": star }
            },
            { new: true }
        ).exec()
        console.log('ratingUpdated', ratingUpdate)
        res.json(ratingUpdate)
    }
}

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec()
    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category,
    })
        .limit(3)
        .populate("category")
        .populate("subs")
        .populate("postedBy")
        .exec()
    res.json(related)
}

// search/filter

const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec()

    res.json(products)
}

exports.searchFilter = async (req, res) => {
    const { query } = req.body
    if (query) {
        console.log('query', query)
        await handleQuery(req, res, query)
    }

}