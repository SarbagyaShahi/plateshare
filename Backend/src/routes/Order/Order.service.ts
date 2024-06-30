import { order } from '../../entity/order.entity';
import { orderModel } from '../../model/order.model';
import { orderDto } from './Order.dto';
import { InvalidInputError } from '../../middleware/error.middleware';
import { menuModel } from '../../model/menu.model';
import { In } from 'typeorm';
import { UserModel } from '../../model/user.model';

export class OrderService {
    constructor(
        private order_model = new orderModel(),
        private menu_model=new menuModel(),
        private user_model=new UserModel()
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

        orders.order_totalprice =order_price;
        orders.ordered_by=create.ordered_by;
        await this.order_model.save(orders)
        return {status:200,message:'Ordered suceessfully'}
    }

    async getorders(read:orderDto){
        let orders = await this.order_model.find({relations:{items:true}});
        return {data:orders}
    }


}