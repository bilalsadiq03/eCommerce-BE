
product_controller = require("../controllers/product.controller.js")
auth_mw = require("../middlewares/auth.mw.js")

module.exports = (app)=>{

    // POST call to create the product
    app.post("/ecomm/api/v1/auth/products", [auth_mw.verifyToken, auth_mw.isAdmin], product_controller.createNewproduct)

    // GET request to fetch all the products
    app.get("/ecomm/api/v1/auth/products",  product_controller.fetchAllProducts);

    // GET request to fetch all the products


    //



    // DELETE request to delete a Product
    app.delete("/ecomm/api/v1/auth/products", [auth_mw.verifyToken, auth_mw.isAdmin], product_controller.deleteProduct)

    
}