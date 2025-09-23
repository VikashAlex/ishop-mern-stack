const CartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");


const orderController = {
    async orderplace(req, res) {
        const { userId, payment_mode, shipping_details } = req.body
        const cart = await CartModel.find({ user_id: userId }).populate('product_id', 'finalPrice _id')
        const productDetails = cart.map((item) => {
            return {
                product_id: item.product_id._id,
                qnty: item.qnty,
                price: item.product_id.finalPrice,
                total: item.product_id.finalPrice * item.qnty
            }
        })
        const total_amount = productDetails.reduce((total, item) => total + item.total, 0);
        const order = await orderModel.create({
            user_id: userId,
            product_Details: productDetails,
            order_total: total_amount,
            payment_mode: payment_mode,
            order_status: 1,
            shipping_details: shipping_details,
        })

        if (payment_mode == 0) {
            await CartModel.deleteMany({ user_id: userId });
            await order.save();
            res.status(201).json({ msg: "Order place Successfull...", success: true, order_id: order._id })
        }
    }
}

module.exports = orderController;