const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')
var cart=require('../controller/cart')

router.post('/AddToCart',(req,res)=>{
    return cart.AddToCart(req,res);
})

router.delete('/RemoveFromCart/:id',(req,res)=>{
    return cart.RemoveFromCart(req,res);
})

router.get('/ViewFromCart/:id',(req,res)=>{
    return cart.ViewFromCart(req,res);
})
router.get('/viewordercount/:id',(req,res)=>{
    return cart.ViewOrderCount(req,res);
})
module.exports=router;