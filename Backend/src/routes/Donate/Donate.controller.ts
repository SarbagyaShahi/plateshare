import { Controller } from "../../lib/bind"
import { Delete, Get, Post, Put } from "../../lib/methods"
import { AuthorizedRequest } from "../../typings/base.type"
import { donateService } from "./Donate.service"

@Controller("/Donate")
export class  DonateController {  
    constructor(
        private service=new donateService()
    ) {
    }

    @Post("/create_donate")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createdonate(body)
        return message
    }
    @Get("/get_donate")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getdonation(body)
        return message
    }
    
}