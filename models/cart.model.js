const mongoose = rquire("mongoose")

const cartSchema = new mongoose.Schema({
    i{

    }
},{timeStamps: true, versionKey: false})

module.exports = mongoose.model("Cart", cartSchema)