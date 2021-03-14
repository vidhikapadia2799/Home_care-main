const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')

var order=require('../controller/placeorder')

router.post('/PlaceOrder',(req,res)=>{
    return order.PlaceOrder(req,res);
})

router.get('/ViewOrder/:id',(req,res)=>{
    return order.ViewOrder(req,res);
})
router.get('/ViewOrderAddress/:id',(req,res)=>{
    return order.ViewOrderAddress(req,res);
})

module.exports=router;