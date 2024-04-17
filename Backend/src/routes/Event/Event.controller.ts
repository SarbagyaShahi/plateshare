import { Controller } from "../../lib/bind"
import { ImageSingle } from "../../lib/imageHandler";
import { Delete, Get, Post, Put } from '../../lib/methods';
import { AuthorizedRequest } from "../../typings/base.type"
import { eventService } from "./Event.service"
import { event } from '../../entity/event.entity';


@Controller("/event")
export class  EventController {  
    constructor(
        private service=new eventService()
    ) {
    }

    @Post("/create_event")
    @ImageSingle("we")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createevent(body)
        return message
    }
    @Get("/get_event")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getevents(body)
        return message
    }

    @Delete("/delete_event")
    async Delete (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.Deleteevents(body)
        return message
    }
}