import { articleDto } from "./article.dto";
import { Post, Get, Put } from "../../lib/methods";
import { InvalidInputError } from "../../middleware/error.middleware";
import { articleModel } from "../../model/article.model";
import { article } from "../../entity/article.entity";

export class articleService {
  constructor(private article_model = new articleModel()) {}

  async createarticle(create: articleDto) {
    //creating a instance 
    let articles = new article();
    //passing the dto value in table passed by user
    articles.article_name = create.article_name;
    articles.article_Image = create.article_Image;
    articles.article_description = create.article_description;
    //this code helps to create a row in article.
    await this.article_model.create(articles);
    return { statusCode: 200, message: "article is created" };
  }

  async getarticle(read: articleDto) {
    let articles = await this.article_model.find({});
    return { data: articles };
  }

  async Putarticles(Put: articleDto) {
    let articles = await this.article_model.findOne({
      where: { Id: Put.article_id },
    });

    articles.article_name = Put.article_name;
    articles.article_description = Put.article_description;

    return "article is edited";
  }
  async Deletearticles(Delete: string) {
    let articles = await this.article_model.findOne({ where: { Id: Delete } });
    if (!articles) throw new InvalidInputError("No id found");
    await this.article_model.delete(articles);
    return "article is deleted";
  }
}
