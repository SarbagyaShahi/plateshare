import { Controller } from "../../lib/bind"
import { Delete, Get, Post } from "../../lib/methods"
import { AuthorizedRequest } from "../../typings/base.type"
import { postService } from "./post.service"
import { ImageSingle } from '../../lib/imageHandler';
import { InvalidInputError } from '../../middleware/error.middleware';


@Controller("/post")
export class  PostController {  
    constructor(
        private service=new postService()
    ) {
    }

    @Post("/create_post")
    @ImageSingle("we")
    async create (req:AuthorizedRequest){
        let body =req.body
        console.log(req.body)
        let message=this.service.createpost(body)
        return message
    }
    @Get("/get_post")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getposts(body)
        return message
    }
    @Delete("/delete_post")
    async Delete (req:AuthorizedRequest){
        let param:{id?:string} =req.query
        if(!param.id)
                throw new InvalidInputError("No id found")
        let message=this.service.Deleteposts(param.id)
        return message
    }
}