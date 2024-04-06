import { AppDataStore } from "../data-source";
import { article } from "../entity/article.entity";



export const articleRepo = AppDataStore.getRepository(article)