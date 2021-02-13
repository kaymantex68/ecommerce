const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required", //<----- what is it ? usually we use 'true'
        minlength: [2, "Too short name"],
        maxlength: [32, "Too long name"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    parent: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Sub", subSchema)