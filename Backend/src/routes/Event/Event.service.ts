import { menu } from '../../entity/menu.entity';
import { eventModel } from '../../model/event.model';
import { eventDto } from './Event.dto';
import { Post, Get, Put } from '../../lib/methods';
import { event } from '../../entity/event.entity';

export class eventService {
    constructor(
        private event_model = new eventModel()
    ) { }
    async createevent(create: eventDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let events = new event()//檢
        events.event_name = create.event_name;
        events.event_location = create.event_location;
        events.event_time=create.event_time;
        events.event_description = create.event_description;
        await this.event_model.create(events)
        return ('event is created')
    }
    async getevents(read: eventDto) {
        let events = await this.event_model.find({});
        return { data: events }
    }
    async Deleteevents(Delete: eventDto) {
        let events = new  event()//檢
        events.event_name = Delete.event_name;
        events.event_location = Delete.event_location;
        events.event_time=Delete.event_time;
        events.event_description = Delete.event_description;

        await this.event_model.delete(events)
        return ('event is deleted')
    }
}