
product_controller = require("../controllers/product.controller.js")
auth_mw = require("../middlewares/auth.mw.js")

module.exports = (app)=>{

    // POST call to create the product
    app.post("/ecomm/api/v1/auth/product/new", [auth_mw.verifyToken, auth_mw.isAdmin], product_controller.createNewproduct)

    // GET request to fetch all the products
    app.get("/ecomm/api/v1/auth/product/all",  product_controller.fetchAllProducts);

    // GET request to fetch a product based on id
    app.get("/ecomm/api/v1/auth/product/:id",[auth_mw.verifyToken, auth_mw.isAdmin] ,product_controller.fetchProductWithId);
 

    // POST request to update a product based on id
    app.post("/ecomm/api/v1/auth/product/update", [auth_mw.verifyToken, auth_mw.isAdmin], product_controller.updateProduct )


    // GET request to fetch products under a category



    // DELETE request to delete a Product
    app.delete("/ecomm/api/v1/auth/product/delete", [auth_mw.verifyToken, auth_mw.isAdmin], product_controller.deleteProduct)

    
}