// export async function  createOrderController(req:any,res:any) {
//     try{
//         const{db} =req.app
//         const{order_name,order_price,order_quantity,order_location,order_type}= req.body;
//         const result = await db.connection('order').insertOne({
//             order_name,
//             order_price,
//             order_quantity,
//             order_location,
//             order_type
//         })

import { Controller } from "../../lib/bind"
import { Delete, Get, Post } from '../../lib/methods';
import { orderDto } from "./Order.dto"
import { OrderService } from "./Order.service"
import { order } from '../../entity/order.entity';
import { create } from 'axios';
import { AuthorizedRequest } from "../../typings/base.type";


// console.log(result)
//     }
//     catch(error){
//         res.status(500).json({error:error.tostring()})
//     }
// }


@Controller("/Order")
export class  OrderController {  
    constructor(
        private service=new OrderService()
    ) {
    }

    @Post("/create_order")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createorder(body)
        return message
    }
    @Get("/get_order")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getorders(body)
        return message
    }
    @Delete("/delete_order")
    async Delete (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.Deleteorders(body)
        return message
    }


//     @Post("/login")
//     login(req:Request,res:Response){
//         let body:ordDto=req.body
//         let message=this.service.login(body,res)
//         return message


//     }

//     @Get("/authorized")
//     @LoginGuard()
//     async authorizd(req:Request){
//         return {message:"Hi there"}
//     }
// } 
}