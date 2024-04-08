import { article } from '../../entity/article.entity';
import { articleModel } from '../../model/article.model';

import { articleDto } from './article.dto';

export class ArticleService {
    constructor(
        private article_model = new articleModel()
    ) { }
    async createarticle(create: articleDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let articles = new article()//檢
        articles.article_description=create.article_description



        await this.article_model.create(articles)
        return ('Article created')
    }
    async getarticle(read: articleDto) {
        let articles = await this.article_model.find({});
        return { data: article }
    }
}