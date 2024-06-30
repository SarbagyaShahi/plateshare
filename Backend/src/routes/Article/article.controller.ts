import { Controller } from "../../lib/bind"
import { ImageSingle } from "../../lib/imageHandler";
import { Delete, Get, Post, Put } from '../../lib/methods';
import { InvalidInputError } from "../../middleware/error.middleware";
import { AuthorizedRequest } from "../../typings/base.type"
import { articleService } from "./article.service";

@Controller("/article")
export class  ArticleController {  
    constructor(
        private service=new articleService()
    ) {
    }

    @Post("/create_article")
    @ImageSingle("article_Image")
    async createarticle (req:AuthorizedRequest){
        //body variable created where data is taken in body
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
    
    @Delete("/delete_article")
    async Delete (req:AuthorizedRequest){
        let param:{id?:string} =req.query
        if(!param.id)
                throw new InvalidInputError("No id found")
        let message=this.service.Deletearticles(param.id)
        return message
    }
}