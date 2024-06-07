const order_controller = require("../controllers/order.controller.js")

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/order/new", order_controller.createNewOrder);
    app.get("/ecomm/api/v1/auth/order/all", order_controller.getAllOrders);
    app.get("/ecomm/api/v1/auth/order/my", order_controller.getUserOrders);
    app.get("/ecomm/api/v1/auth/order/:id", order_controller.getOrderById);
    app.get("/ecomm/api/v1/auth/order/total", order_controller.countTotalorders);
    app.get("/ecomm/api/v1/auth/order/totalSales", order_controller.calculateTotalSales);
}