import { menu } from '../../entity/menu.entity';
import { eventModel } from '../../model/event.model';
import { eventDto } from './Event.dto';
import { Post, Get, Put } from '../../lib/methods';
import { event } from '../../entity/event.entity';

export class EventService {
    constructor(
        private event_model = new eventModel()
    ) { }
    
    async createevent(create: eventDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let events = new event()//檢
        events.event_name = create.event_name;
        events.event_location = create.event_location;
        events.event_description = create.event_description;
        events.event_time=create.event_time;
        
      
        
        await this.event_model.create(events)
        return ('event is created')
    }
    async get(readevents:eventDto){
        let events = await this.event_model.find({});
        return {data:events}
    }
}