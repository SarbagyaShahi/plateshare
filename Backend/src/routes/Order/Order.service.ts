import { order } from '../../entity/order.entity';
import { orderModel } from '../../model/order.model';
import { orderDto } from './Order.dto';
import { InvalidInputError } from '../../middleware/error.middleware';
import { menuModel } from '../../model/menu.model';
import { In } from 'typeorm';

export class OrderService {
    constructor(
        private order_model = new orderModel(),
        private menu_model=new menuModel()
    ) {}

    async createorder(create: orderDto) {
        let orders = new order()
        let foodItem=await this.menu_model.find({where:{Id:In(create.order_items)}})
        let order_price=0        
        for(let i of foodItem){
            order_price+=i.menu_price
        }
        if(foodItem.length <=0)
            throw new InvalidInputError("No food found")
        orders.order_location = create.order_locations;
        orders.items=foodItem
        orders.order_price =order_price;
        console.log(orders)
        await this.order_model.save(orders)
        return ('order is created')
    }

    async getorders(read:orderDto){
        let orders = await this.order_model.find({relations:{items:true}});
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