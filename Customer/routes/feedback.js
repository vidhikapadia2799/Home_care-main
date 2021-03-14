const express=require('express');
const router=express.Router();
var FeedbackManagement=require('../controller/feedback')
const {isSignedIn}=require('../../Customer/controller/user')

router.post('/AddFeedback/:id',(req,res)=>{
    return FeedbackManagement.AddFeedback(req,res);
})

router.get('/ViewFeedback/:id',(req,res)=>{
    return FeedbackManagement.ViewFeedback(req,res);
})

router.get('/AdminViewFeedback',(req,res)=>{
    return FeedbackManagement.AdminViewFeedback(req,res);
})

router.delete('/DeleteFeedback/:id',(req,res)=>{
    return FeedbackManagement.DeleteFeedback(req,res);
})

module.exports=router;