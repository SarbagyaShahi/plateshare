import { event } from "../../entity/event.entity";
import * as yup from "yup";

export interface eventDto {
  event_Id?: string;
  event_name?: string;
  event_location?: string;
  event_time?: number;
  event_description?: string;
  event_Image?: string;
}
export const event_schema = yup.object().shape({
  event_name: yup.string().required(),
  event_location: yup.string().required(),
  event_time: yup.number().required(),
  event_description: yup.string().required(),
  event_Image: yup.string().required(),
});
