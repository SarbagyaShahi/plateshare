import { order } from '../../entity/order.entity';
export interface orderDto{
    order_name?:string,
    order_price?:number,
    order_location?:string,
    order_quantity?:number,
    order_type?:string,
    
}