import { order } from '../../entity/order.entity';
import { orderModel } from '../../model/order.model';
import { orderDto } from './Order.dto';
import { Request } from 'express';
import { Delete } from '../../lib/methods';
import { InvalidInputError } from '../../middleware/error.middleware';

export class OrderService {
    constructor(
        private order_model = new orderModel()
    ) { }
    async createorder(create: orderDto) {
         
        let orders = new order()
        orders.order_location = create.order_location;
        orders.order_name = create.order_name;
        orders.order_price = create.order_price;
        await this.order_model.create(orders)
        return ('order is created')
    }
    async getorders(read:orderDto){
        let orders = await this.order_model.find({});
        return {data:orders}
    }
    async Deleteorders(Delete: string) {
        let orders = await this.order_model.findOne({where:{Id:Delete}})
        if(!orders)
            throw new InvalidInputError("No id found")
        await this.order_model.delete(orders)
        return ('menu is deleted')
    }
}