export async function  createOrderController(req:any,res:any) {
    try{
        const{db} =req.app
        const{order_name,order_price,order_quantity,order_location,order_type}= req.body;
        const result = await db.connection('order').insertOne({
            order_name,
            order_price,
            order_quantity,
            order_location,
            order_type
        })
      
console.log(result)
    }
    catch(error){
        res.status(500).json({error:error.tostring()})
    }
}