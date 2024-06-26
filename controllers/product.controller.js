const product_model = require("../models/product.model.js");

// Create a new Product
exports.createNewproduct = async (req, res) => {

    // Create the product
    const ProductData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.body.productImage,
        stock: req.body.stock,
        category: req.body.category
    }

    // Insert into MongoDB
    try {
        const product = await product_model.create(ProductData);
        res.status(201).send(product);
        
        
    } catch (error) {
        console.log("Error while creating  a new Product", error);
        return res.status(500).send({
            message: "Error while creating a new Product"
        })
    }


    //
}


// Get a list of products
exports.fetchAllProducts = async (req, res) => {
    
    try {
        const products = await product_model.find()
        res.status(201).send(products)
    } catch (error) {
        console.log("Error getting all products ", error);
        return res.status(404).send({
            message: "Error getting all products"
        });
    
    }
}




// Get a Product based on the product id
exports.fetchProductWithId = async (req, res) => {
    const productId = req.body.id;
    
    try {
        const product = await product_model.findById(productId);
        res.status(201).send(product)
    } catch (error) {
        console.log("Error geting the Product", error)
        return res.status(404).send({
            message: "Error fetching the Product"
        })
    }
}



// Update an existing Product
exports.updateProduct = async (req, res) => {

    const productData = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.body.productImage,
        stock: req.body.stock,
        category: req.body.category
    }
    try {
        const product = await product_model.findByIdAndUpdate(req.body.id, { ...productData}, {new: true});
        res.status(201).send(product);
    } catch (err) {
        console.log("Error while Updating the product details:" ,err);
        return res.status(404).send({
            message: "Error updating  the Product details."
        })
    }
    



}



// Delete an existing product based on product name
exports.deleteProduct = async (req, res) => {
    const productName = req.body.name;

    try {
        const product = await product_model.deleteMany( {name : productName} )  
        res.send(product); 
    } catch (error) {
        console.log("Error deleting the Product ", error);
        return res.status(404).send({
            message: "Error deleting the Product"
        })
    }
}




// TODO:  Get a list og products under a category