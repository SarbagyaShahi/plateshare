import { event } from '../../entity/event.entity';

export interface eventDto {

    event_name?: string,
    event_location?: string,
    event_time?: number,
    event_description?: string
}