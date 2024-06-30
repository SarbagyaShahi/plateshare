import { donate } from '../../entity/donate.entity';
export interface donateDto {
    donate_name?: string,
    donated_by?: string,

    donated_price?: number,
    donation_location?:string,
    donation_Id?:string



}
