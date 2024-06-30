import * as yup from "yup";
export interface postDto {
  post_name?: string;
  post_Id?: string;
  post_description?: string;
  posted_ingredients?: string;
  posted_by?: string;
}
export const post_schema = yup.object().shape({
  post_name: yup.string().required(),
  post_description: yup.string().required(),
  posted_ingredients: yup.string().required(),
  posted_by: yup.string().required(),
});
