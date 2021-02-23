const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");
const Product = require('../models/product')

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category(
            {
                name, slug: slugify(name)
            }).save();
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(400).send("Create category error");
    }
};

exports.list = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec())
};

exports.read = async (req, res) => {
    console.log(req.params.slug)
    let category = await Category.findOne({ slug: req.params.slug }).exec()
    // res.json(category)
    const products = await Product.find({category: category})
    .populate('category')
    .exec()

    res.json({
        category,
        products
    })
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        let updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        )
        res.json(updated)
    } catch (err) {
        console.log(err)
        res.status(400).send("Create update error");
    }
};

exports.remove = async (req, res) => {
    try {

        const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
        res.json(deleted)
    } catch (err) {
        res.status(400).send("Create delete error");
    }
};


exports.getSubs = async (req, res) => {
    try {
        await Sub.find({ parent: req.params._id }).exec((err, subs) => {
            if (err) console.log(err)
            res.json(subs)
        })
    } catch (err) {
        res.status(400).send("Get subs error");
    }
}