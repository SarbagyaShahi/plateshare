import { Controller } from "../../lib/bind"
import { Get, Post } from '../../lib/methods';
import { order_schema } from "./Order.dto"
import { OrderService } from "./Order.service"
import { AuthorizedRequest } from "../../typings/base.type";

@Controller("/order")
export class  OrderController {  
    constructor(
        private service=new OrderService()
    ){}

    @Post("/create_order")
    async create (req:AuthorizedRequest){
        let body=order_schema.validateSync(req.body)
        console.log(req.body)
        let message=await this.service.createorder(body)
        return message
    }

    @Get("/get_order")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=await this.service.getorders(body)
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