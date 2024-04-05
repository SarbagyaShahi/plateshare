import { order } from '../entity/order.entity';
// import { orderRepo } from "../repository/order.repo.ts";
import { GlobalModel } from "./global.model";
import {orderRepo} from "../repository/order.repo"


export class orderModel extends GlobalModel<order>{
    constructor(){
        super(orderRepo);
    }
}