const client=require("../../Connection/connection");

exports.AddToCart=function(req,res){
    (async()=>{
        const cartdata=req.body;
        const addtocart=await client.query("insert into cart(subservice_id,customer_id) values($1,$2)",[cartdata.subservice_id,cartdata.customer_id],(error)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:'Success',
                msg:"Service Added into cart"
            })
        })
    })();

}


exports.RemoveFromCart=function(req,res){
    (async()=>{
        const cart_id=req.params.id;
        const removefromcart=await client.query("delete from cart where cart_id=$1",[cart_id],(error)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:'Success',
                msg:"Service removed from cart"
            })
        })
    })();

}
exports.ViewFromCart=function(req,res){
    (async()=>{
        const customer_id=req.params.id;
        const viewfromcart=await client.query("select * from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1 and status=0",[customer_id],(error,response)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json(response.rows
            )
        })
    })();

}
exports.ViewOrderCount=function(req,res){
    (async()=>{
        const customer_id=req.params.id;
        const viewordercount=await client.query("select distinct subservices.subservice_id from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1",[customer_id],(error,response)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json(response.rows)
        })
    })();

}