import { AppDataStore } from "../data-source";
import { post } from "../entity/post.entity";
import { Post } from '../lib/methods';



export const postRepo=AppDataStore.getRepository(post)