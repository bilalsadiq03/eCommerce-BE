const mongoose = require("mongoose")

const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }

},{timestamps :true, versionKey: false})

module.exports = mongoose.model( "Product", productSchema)