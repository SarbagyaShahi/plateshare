import { Controller } from "../../lib/bind"
import { ImageSingle } from "../../lib/imageHandler";
import { Delete, Get, Post, Put } from '../../lib/methods';
import { InvalidInputError } from "../../middleware/error.middleware";
import { AuthorizedRequest } from "../../typings/base.type"
import { eventService } from "./Event.service"

@Controller("/Event")
export class  EventController {  
    constructor(
        private service=new eventService()
    ) {
    }

    @Post("/create_event")
    @ImageSingle("event_Image")
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
    @Put("/put_event")
    @ImageSingle("food_image")
    async edit (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.Putevents(body)
        return message
    }
    @Delete("/delete_event")
    async Delete (req:AuthorizedRequest){
        let param:{id?:string} =req.query
        if(!param.id)
                throw new InvalidInputError("No id found")
        let message=this.service.Deleteevents(param.id)
        return message
    }
}