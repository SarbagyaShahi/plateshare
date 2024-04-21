import { Controller } from "../../lib/bind"
import { Delete, Get, Post } from "../../lib/methods"
import { AuthorizedRequest } from "../../typings/base.type"
import { donateService } from "./Donate.service"
import { ImageSingle } from '../../lib/imageHandler';
import { InvalidInputError } from '../../middleware/error.middleware';



@Controller("/donate")
export class  DonateController {  
    constructor(
        private service=new donateService()
    ) {
    }

    @Post("/create_donate")
    @ImageSingle("We")
    async create (req:AuthorizedRequest){
        let body =req.body
        console.log(req.body)
        let message=this.service.createdonate(body)
        return message
    }
    @Get("/get_donate")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getdonation(body)
        return message
    }
    // @Delete("/delete_post")
    // async Delete (req:AuthorizedRequest){
    //     let param:{id?:string} =req.query
    //     if(!param.id)
    //             throw new InvalidInputError("No id found")
    //     let message=this.service.Deletedonation(param.id)
    //     return message
    // }
    
    }


