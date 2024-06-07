const order_model = require('../models/order.model.js')
const product_model = require('../models/product.model.js')

// Functions to be made 
// createOrder   ✔
// getAllOrders  ✔
// getUserOrders  ✔
// countTotalOrders  ✔
// calculateTotalSales ✔
// markOrderAsPaid,
// markOrderAsDelivered,
//



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
            message: error.message
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



exports.getUserOrders = async (req, res) =>{
  // const user_id = req.body.id;
  try {
    const orders = await order_model.find({user: req.body.id});
    res.send(orders);
  } catch (error) {
    res.status(500).send({ 
      error: error.message 
    });
  }
}


exports.countTotalorders = async (req, res) => {
  try {
    const totalOrders = await order_model.countDocuments();
    res.status(200).send({ totalOrders });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.calculateTotalSales = async (req, res) => {
  try {
    const orders = await order_model.find();
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    res.send({ totalSales });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


exports.getOrderById =  async (req, res) => {
  const orderId = req.body.id;
    
    try {
        const order = await order_model.findById(orderId);
        res.status(201).send(order)
    } catch (error) {
        console.log("Error geting the Order", error)
        return res.status(404).send({
            message: "Error fetching the Order"
        })
    }
}


exports.markOrderAsPaid = async (req, res) => {
  try {
    const order = await order_model.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order_model.save();
      res.status(200).send(updateOrder);
    } else {
      res.status(404).send({
        message: "Order not found!"
      })
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}