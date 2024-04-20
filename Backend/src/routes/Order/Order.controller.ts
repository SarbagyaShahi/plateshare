
import { Controller } from "../../lib/bind"
import { Delete, Get, Post } from '../../lib/methods';
import { orderDto } from "./Order.dto"
import { OrderService } from "./Order.service"
import { order } from '../../entity/order.entity';
import { create } from 'axios';
import { AuthorizedRequest } from "../../typings/base.type";
import { InvalidInputError } from '../../middleware/error.middleware';

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
    // @Delete("/delete_order")
    // async Delete (req:AuthorizedRequest){
    //     let param:{order_id?:string} =req.query
    //     if(!param.order_id)
    //             throw new InvalidInputError("No id found")
    //     let message=this.service.Deleteorders(param.order_id)
    //     return message
    // }



}