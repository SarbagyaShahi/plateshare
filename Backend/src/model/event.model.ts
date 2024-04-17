import { event } from '../entity/event.entity';
import { eventRepo } from "../repository/event.repo";
import { GlobalModel } from "./global.model";


export class eventModel extends GlobalModel<event>{
    constructor(){
        super(eventRepo);
    }
}