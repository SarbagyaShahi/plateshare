import { donate } from '../../entity/donate.entity';
import { donateModel } from '../../model/donate.model';

import { donateDto } from './Donate.dto';

export class donateService {
    constructor(
        private donate_model = new donateModel()
    ) { }
    async createdonate(create: donateDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let donation = new donate()//檢
        donation.donate_name = create.donate_name;
        donation.donated_by = create.donated_by;
       donation.donated_time=create.donated_time;
        donation.donated_price = create.donated_price;



        await this.donate_model.create(donation)
        return ('You have donated')
    }
    async getdonation(read: donateDto) {
        let donation = await this.donate_model.find({});
        return { data: donation }
    }
}