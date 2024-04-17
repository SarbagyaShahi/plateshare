import { Controller } from "../../lib/bind"
import { ImageSingle } from "../../lib/imageHandler";
import { Delete, Get, Post, Put } from '../../lib/methods';
import { AuthorizedRequest } from "../../typings/base.type"
import { EventService } from "./Event.service"
import { event } from '../../entity/event.entity';

@Controller("/Event")
export class  EventController {  
    constructor(
        private service=new EventService()
    ) {
    }

    
    @Post("/create_event")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createevent(body)
        return message
    }
    @Get("/get_menu")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.get(body)
        return message
    }}