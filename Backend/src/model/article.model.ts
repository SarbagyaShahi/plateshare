import { article } from "../entity/article.entity";

import { articleRepo } from "../repository/article.repo";
import { GlobalModel } from "./global.model";


export class articleModel extends GlobalModel<article> {
    constructor() {
        super(articleRepo);
    }
}