import { article } from '../../entity/article.entity';
import { articleModel } from '../../model/article.model';
import { articleDto } from './article.dto';
import { Post, Get, Put } from '../../lib/methods';
import { InvalidInputError } from '../../middleware/error.middleware';
import * as fs from "fs"
import { global_settings } from '../../bootstrap/config';
export class articleService {
    constructor(
        private article_model = new articleModel()
    ) { }

    async createarticle(filename:string, buffer:Buffer) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let articles = new article()//檢
        articles.article_name = filename;
        fs.writeFile(global_settings.static.article,buffer,console.log)
        await this.article_model.create(articles)
        return ('menu is created')
    }
    async getarticles(read: articleDto) {
        let articles = await this.article_model.find({});
        return { data: articles }
    }

   
    async Deletearticles(Delete: string) {
        let articles = await this.article_model.findOne({where:{Id:Delete}})
        if(!articles)
            throw new InvalidInputError("No id found")
        await this.article_model.delete(articles)
        return ('menu is deleted')
    }
}
