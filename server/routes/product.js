const express = require('express')
const router = express.Router()

// import middleware 
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { 
    create, 
    listAll, 
    remove, 
    read, 
    update, 
    list , 
    productsCount, 
    productStar, 
    listRelated,
    searchFilter} = require("../controllers/product")

// routes

router.post('/product', authCheck, adminCheck, create)
router.get('/products/total', productsCount)
router.get('/products/:counts', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.get('/product/:slug', read)
router.put('/product/:slug', authCheck, adminCheck, update)

router.post('/products', list)

// rating
router.put('/product/star/:productId',authCheck, productStar)
// related
router.get('/product/related/:productId', listRelated)
// search
router.post('/search/filters', searchFilter)

module.exports = router 