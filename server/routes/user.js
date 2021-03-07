const express = require('express')

const router = express.Router()

// middlewares
const { authCheck,adminCheck }=require('../middlewares/auth')
// controllers
const { userCart, getUserCart }=require('../controllers/user')

router.post('/user/cart',authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart)
// router.get('/user', (req, res) => {
//     res.json({
//         data: "user API endpoint",
//     });
// })

module.exports = router