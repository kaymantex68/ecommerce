const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required', //<----- what is it ? usually we use 'true'
        minlength: [3, 'Too short name'],
        maxlength: [32, 'Too long name'],
    },
    slug: {
        type: String,
        trim: true,
        uniq: true,
        lowercase: true,
        index: true,
    }
},{
    timestamps: true
}
)

module.exports=mongoose.model('Category', categorySchema)