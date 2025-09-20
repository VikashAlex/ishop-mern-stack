const CartModel = require("../models/cart.model");

const cartController = {

    async moveToDb(req, res) {
        try {
            const { cart, userId } = req.body
            if (cart==null || cart.length==0) {
                return res.status(200).json({ msg: "cart is found...", success: true, cart: await CartModel.find({ user_id: userId }).populate('product_id','originalPrice finalPrice') })
            }
            await Promise.all(
                cart.map(async (product) => {
                    const existingItem = await CartModel.findOne({ user_id: userId, product_id: product.productId })
                    if (existingItem) {
                        existingItem.qnty += Number(product.qnty);
                        await existingItem.save()
                    } else {
                        const updatecart = await CartModel.create({
                            user_id: userId,
                            product_id: product.productId,
                            qnty: product.qnty
                        })
                        await updatecart.save()
                    }
                })
            )
            res.status(200).json({ msg: "cart ok", success: true, cart: await CartModel.find({ user_id: userId }).populate('product_id','originalPrice finalPrice') })
        } catch (error) {
            console.log(error)
        }
    },
    async addToCart(req,res){
        try {
            const { productId, userId } = req.body
            console.log(productId)
            return
            const existingItem = await CartModel.findOne({user_id:userId,product_id:cart.productId});
            if (existingItem) {
                existingItem.qnty+=Number(cart.qnty);
                await existingItem.save();
            }else{
                const updatecart =await CartModel.create({
                    user_id:userId,
                    product_id:cart.productId,
                    qnty:cart.qnty
                })
                await updatecart.save()
            }
        } catch (error) {
            
        }
    }

};


module.exports = cartController;





