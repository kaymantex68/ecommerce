const express = require('express')
const router = express.Router()

// import middleware 
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create , listAll} = require("../controllers/product")

// routes

router.post('/product', authCheck, adminCheck, create)
router.get('/products/:counts', listAll)

module.exports = router