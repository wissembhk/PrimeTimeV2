import express from 'express';
const router= express.Router();
 
import stripe from "stripe";
var stripe1 = stripe('sk_test_51KcqoWJoQcapggoAcqRgLXQyc3pYB9OK94khZLmfnQe0LxzQCh5t7dsmBfJQaO88qtqM1QChc0R4RS8Pf9yv8u9f00G3hBY3ci');
import Order from '../models/order.js';
import cors from 'cors';

router.use(cors());

 
router.post("/payment", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
	let { amount, id } = req.body
 
  console.log("stripe-routes.js 10 | amount and id", amount, id);
	try {
		const payment = await stripe1.paymentIntents.create({
			amount,
			currency: "USD",
			description: "PrimeTime Product",
			payment_method: id,
			confirm: true
		})
		console.log("stripe-routes.js 19 | payment", payment);
		res.json({
			message: "Payment successful",
			success: true
		})  
	} catch (error) {
		console.log("stripe-routes.js 17 | error", error);
		res.json({
			message: "Payment failed", 
			success: false
		})  
	}
})
router.post( '/',async(req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
      
     
    });
    try{
      const order = await newOrder.save();
      console.log(order); 
      res.status(201).send({ message: 'New Order Created', order });
  }catch(err){
      res.send('Error')
  }
    
    
  })

 
   
  


  router.put( '/:id/pay', cors(),async(req, res) => {

    
    const order = await Order.findById(req.params.id);
    

    console.log(req.params.id);
    if (order && order.isPaid==false) {
      order.isPaid = true;
      order.paidAt = Date.now();
    
      await order.save();


      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });  
    }
  })  



  router.get( '/mine/:id',async(req, res) => {
    const orders = await Order.find({user:req.params.id});
    console.log(req.params.id)
    if (orders) {
      res.send(orders);
    } else {
      res.status(404).send({ message: 'Orders Not Found' });
    }
  })

  router.get( '/:id',async(req, res) => {
    
    const order = await Order.findById(req.params.id);
    console.log(order)
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
   
 
      
        
export default router;