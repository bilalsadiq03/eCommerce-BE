
// Post call to "0.0.0.0:8080/ecomm/api/v1/auth/categories" to create Category
category_controller = require("../controllers/category.controller")
auth_mw = require("../middlewares/auth.mw.js")

module.exports = (app)=> {
    app.post("/ecomm/api/v1/auth/categories", [auth_mw.verifyToken, auth_mw.isAdmin],category_controller.createNewCtegory)
}