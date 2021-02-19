const express = require('express')
const router = express.Router()

// import middleware 
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, listAll, remove, read, update, list } = require("../controllers/product")

// routes

router.post('/product', authCheck, adminCheck, create)
router.get('/products/:counts', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.get('/product/:slug', read)
router.put('/product/:slug', authCheck, adminCheck, update)

router.post('/products', list)

module.exports = router