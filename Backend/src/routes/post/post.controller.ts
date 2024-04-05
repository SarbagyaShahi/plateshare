import { Controller } from "../../lib/bind"
import { Delete, Get, Post } from "../../lib/methods"
import { AuthorizedRequest } from "../../typings/base.type"
import { postService } from "./post.service"


@Controller("/post")
export class  postController {  
    constructor(
        private service=new postService()
    ) {
    }

    @Post("/create_post")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createpost(body)
        return message
    }
    @Get("/get_post")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getpost(body)
        return message
    }
    @Delete("/delete_post")
    async Delete (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.Deleteposts(body)
        return message
    }
}

