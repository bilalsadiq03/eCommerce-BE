const mongoose = require("mongoose")

const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [, "Please provide price"]
    },
    description : {
        type: String,
        default: "",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        trim: true
    }

},{timestamps :true, versionKey: false})

module.exports = mongoose.model( "Product", productSchema)