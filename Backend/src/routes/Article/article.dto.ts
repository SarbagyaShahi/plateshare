
import { article } from '../../entity/article.entity';
import * as yup from "yup"
export interface articleDto {
    
    article_name?:string,
    article_id?:string,
    article_description?:string,
    article_Image?:string,

}
export const article_schema=yup.object().shape({
    article_name:yup.string().required(),
    article_description:yup.string().required(),
    article_Image:yup.string().required()
})
