import * as yup from "yup"
export interface orderDto{
  order_items?:number[]
  order_locations?:string
}

export const order_schema=yup.object().shape({
  order_items:yup.array(yup.number()),
  order_locations:yup.string()
})