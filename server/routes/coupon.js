const express = require('express')
const router = express.Router()

// import middleware 
const { authCheck, adminCheck } =require('../middlewares/auth')

// import controllers
const { create, remove, list } = require("../controllers/coupon")

// routes

router.post('/coupon', authCheck, adminCheck ,create)
router.get('/coupons' ,list)
router.delete('/coupon/:couponId', authCheck, adminCheck ,remove)

module.exports = router