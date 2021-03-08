const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.userCart = async (req, res) => {
    console.log(req.body)
    const { cart } = req.body

    let products = []

    const user = await User.findOne({ email: req.user.email }).exec()

    let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec()

    if (cartExistByThisUser) {
        cartExistByThisUser.remove()
        console.log('remove old cart')
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {}
        object.product = cart[i]._id
        object.count = cart[i].count
        object.color = cart[i].color

        let { price } = await Product.findById(cart[i]._id).select('price').exec()
        // console.log('price----------------->', price)
        object.price = price;

        products.push(object)
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count
    }

    let newCart = await new Cart({
        products,
        cartTotal,
        orderBy: user._id,

    }).save()

    console.log('newCart ------>', newCart)
    res.json({ ok: true })
}

exports.getUserCart = async (req, res) => {
    console.log('we here')
    const user = await User.findOne({ email: req.user.email }).exec()
    let cart = await Cart.findOne({ orderBy: user._id })
        .populate('products.product', '_id title price totalAfterDiscount')
        .exec()
    const { products, cartTotal, totalAfterDiscount } = cart
    console.log('userCart----------->', cart)
    res.json({ products, cartTotal, totalAfterDiscount })
}