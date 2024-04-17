import { Controller } from "../../lib/bind"
import { ImageSingle } from "../../lib/imageHandler"
import { Delete, Get, Post, Put } from "../../lib/methods"
import { AuthorizedRequest } from "../../typings/base.type"
import { ArticleService} from "./article.service"

@Controller("/Article")
export class  ArticleController {  
    constructor(
        private service=new ArticleService()
    ) {
    }

    @Post("/create_article")
    @ImageSingle("we")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createarticle(body)
        return message
    }
    @Get("/get_article")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getarticle(body)
        return message
    }
    
}