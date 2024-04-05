import { order } from '../../entity/order.entity';
import { orderModel } from '../../model/order.model';
import { orderDto } from './Order.dto';
import { Request } from 'express';
import { Delete } from '../../lib/methods';

export class OrderService {
    constructor(
        private order_model = new orderModel()
    ) { }
    async createorder(create: orderDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let orders = new order()//檢
        orders.order_location = create.order_location;
        orders.order_name = create.order_name;
        orders.order_price = create.order_price;
        orders.order_quantity = create.order_quantity;
        orders.order_type = create.order_type;
        await this.order_model.create(orders)
        return ('order is created')
    }
    async getorders(read:orderDto){
        let orders = await this.order_model.find({});
        return {data:orders}
    }
    async Deleteorders(Delete:orderDto){
        let orders = new order()//檢
        orders.order_location = Delete.order_location;
        orders.order_name = Delete.order_name;
        orders.order_price = Delete.order_price;
        orders.order_quantity = Delete.order_quantity;
        orders.order_type = Delete.order_type;
        await this.order_model.create(orders)
        return ('order is created')
    }
    // async register(data: RegisterDto) {
    //     console.log(data)
    //     let existingUser = await this.user_model.findOne({ where: { User_email: data.email } })
    //     if (existingUser)
    //         throw new InvalidInputError("Email already registered")
    //     if (data.password !== data.confirmPassword)
    //         throw new InvalidInputError("Password do not match")
    //     let user = new User()
    //     user.User_Phone = data.number
    //     user.User_address = data.address
    //     user.User_email = data.email
    //     user.User_name = data.first_name + " " + data.last_name
    //     let hashPass = hashPassword(data.password)
    //     user.User_password = hashPass
    //     await this.user_model.create(user)
    //     return { message: "User created" }
}