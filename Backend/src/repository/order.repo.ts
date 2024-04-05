import { AppDataStore } from "../data-source";
import { order } from '../entity/order.entity';


export const orderRepo=AppDataStore.getRepository(order)