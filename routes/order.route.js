const order_controller = require("../controllers/order.controller.js")

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/order/new", order_controller.createNewOrder);
    app.get("/ecomm/api/v1/auth/order/all", order_controller.getAllOrders);
    app.get("/ecomm/api/v1/auth/order/my", order_controller.getUserOrders);
}