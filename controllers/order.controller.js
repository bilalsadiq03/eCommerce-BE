const order_model = require('../models/order.model.js')
const product_model = require('../models/product.model.js')

// const  reduceStock = async (orderItems) => {
//     for (let i = 0; i < orderItems.length; i++) {
//         const order = orderItems[i];
//         const product = await product_model.findById(order.productId);
//         if (!product) {
//             throw new Error('Product not found');
//         } 
//         product.stock -= order.quantity;
//         await product.save();
        
        
//     }
// }

// const reduceStock = async (orderItems) => {
//     const promises = orderItems.map(async (order) => {
//       const product = await product_model.findById(order.productId);
//       if (!product) {
//         throw new Error(`Product with ID ${order.productId} not found`);
//       } 
//       product.stock -= order.quantity;
//       return product.save();
//     });
//     await Promise.all(promises);
//   }

exports.createNewOrder = async (req, res) => {

    const {
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
      } = req.body;

      if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
        return res.status(500).send({ message: "Please Enter All Fields"});

    try {
        const order = await order_model.create({
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total,
          });
        
        // TODO: Fixing this after completion
        // await reduceStock(orderItems);
        // invalidateCache({
        //     product: true,
        //     order: true,
        //     admin: true,
        //     userId: user,
        //     productId: order.orderItems.map((i) => String(i.productId)),
        //   });

          return res.status(201).send({
            success: true,
            message: "Order Placed Successfully",
          });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while placing the order!"
        })
    }

}


exports.getAllOrders = async (req, res) => {

  try {
    const orders = await order_model.find();
    res.status(201).send(orders);
  } catch (error) {
    console.log("Error getting all orders ", error);
    return res.status(404).send({
      message: "Error getting all orders",
    });
  }

}


// TODO : Fixing this after Porject completion
exports.getUserOrders = async (req, res) =>{
  const user_id = req.body.id;
  try {
    const orders = await order_model.findById({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}