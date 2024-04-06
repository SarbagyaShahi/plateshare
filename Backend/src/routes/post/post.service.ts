import { post } from '../../entity/post.entity';
import { postModel } from '../../model/post.model';
import { postDto } from './post.dto';
import { Request } from 'express';
import { Delete } from '../../lib/methods';
import { create } from 'axios';


export class postService {
    constructor(
        private post_model = new postModel()
    ) { }
    async createpost(create: postDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let posts = new post()//檢
        posts.post_name = create.post_name;
        posts.post_description = create.post_description;
        posts.posted_by = create.posted_by;

        await this.post_model.create(posts)
        return ('post is created')
    }
    async getposts(read: postDto) {
        let posts = await this.post_model.find({});
        return { data: posts }
    }
    async Deleteposts(Delete: postDto) {
        let posts = new post()//檢
        posts.post_name = Delete.post_name;
        posts.post_description = Delete.post_description;
        posts.posted_by = Delete.posted_by;

        await this.post_model.delete(posts)
        return ('post is deleted')
    }
}