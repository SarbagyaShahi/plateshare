import { post } from "../../entity/post.entity";
import { postModel } from "../../model/post.model";
import { postDto } from "./post.dto";
import { InvalidInputError } from "../../middleware/error.middleware";

export class postService {
  constructor(private post_model = new postModel()) {}
  async createpost(create: postDto) {
    let posts = new post(); 
    posts.post_name = create.post_name;
    posts.post_description = create.post_description;
    posts.posted_ingredients = create.posted_ingredients;
    posts.posted_by = create.posted_by;
    await this.post_model.create(posts);
    return { status: 200, message: "post is created" };
  }
  async getposts(read: postDto) {
    let posts = await this.post_model.find({});
    return { data: posts };
  }
  async Deleteposts(Delete: string) {
    let posts = await this.post_model.findOne({ where: { Id: Delete } });
    if (!posts) throw new InvalidInputError("No id found");
    await this.post_model.delete(posts);
    return { status: 200, message: "post is deleted" };
  }
}
