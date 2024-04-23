import { Controller } from "../../lib/bind"
import { FileSingle } from "../../lib/imageHandler";
import { Delete, Get, Post, Put } from '../../lib/methods';
import { InvalidInputError } from "../../middleware/error.middleware";
import { AuthorizedRequest, FileRequests } from "../../typings/base.type";

import { articleService } from "./article.service";

@Controller("/article")
export class  articleController {  
    constructor(
        private service=new articleService()
    ) {
    }

    @Post("/create_article")
    @FileSingle("article_file")
    async create (req:FileRequests){
        let message=this.service.createarticle(req.requestFile[0].filename, req.requestFile[0].buffer[0])
        return message
    }
    @Get("/get_article")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getarticles(body)
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