const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        // required - is a necessary param (true or false). must have required!
        required: true,
        index: true,
    },
    // role - is a important param, for example role Admin, he can to add new posts and other
    role: {
        type: String,
        default: "subscriber",
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    // wishlist: [{type: ObjectId, ref: "Product"}],
},
    {
        timestamps: true
    }
)

module.exports=mongoose.model("User", userSchema)