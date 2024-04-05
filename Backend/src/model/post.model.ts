import { post } from '../entity/post.entity';
import { postRepo } from '../repository/post.repo';
// import { orderRepo } from "../repository/order.repo.ts";
import { GlobalModel } from "./global.model";



export class postModel extends GlobalModel<post>{
    constructor(){
        super(postRepo);
    }
}