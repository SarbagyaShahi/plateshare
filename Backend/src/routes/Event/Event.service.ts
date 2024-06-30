import { menu } from '../../entity/menu.entity';
import { menuModel } from '../../model/menu.model';
import { eventDto } from './Event.dto';
import { Post, Get, Put } from '../../lib/methods';
import { InvalidInputError } from '../../middleware/error.middleware';
import { eventModel } from '../../model/event.model';
import { event } from '../../entity/event.entity';

export class eventService {
    constructor(
        private event_model = new eventModel()
    ) { }

    async createevent(create: eventDto) { 
        let events = new event()
        events.event_name = create.event_name;
        events.event_description = create.event_description;
        events.event_Image = create.event_Image;

        events.event_location = create.event_location;
        events.event_time = create.event_time;

        await this.event_model.create(events)
        return {status:200,message:'event is created'}
        
    }
    async getevents(read: eventDto) {
        let events = await this.event_model.find({});
        return { data: events }
    }

    // async Putevents(Put: eventDto,) {
    //     let events = await this.event_model.findOne({ where: { Id: Put.event_Id } });

    //     events.event_name = Put.event_name;
    //     events.event_Image = Put.event_Image;
    //     events.event_description = Put.event_description;
    //     events.event_Image = Put.event_Image ? Put.event_Image : events.event_Image
    //     await this.event_model.save(events)
    //     return ('Event is edited')
    // }
    async Putevents(Put: eventDto,) {
        let events = await this.event_model.findOne({ where: { Id: Put.event_Id } });
        events.event_name = Put.event_name;
        events.event_description=Put.event_description;
        events.event_time=Put.event_time;
        await this.event_model.save(events)
        return {status:200,message:'event is edited'}
    }
    async Deleteevents(Delete: string) {
        let events = await this.event_model.findOne({where:{Id:Delete}})
        if(!events)
            throw new InvalidInputError("No id found")
        await this.event_model.delete(events)
        return ('Event is deleted')
    }
}
