import { donate } from "../entity/donate.entity";
import { donateRepo } from "../repository/donate.repo";
import { GlobalModel } from "./global.model";


export class donateModel extends GlobalModel<donate>{
    constructor(){
        super(donateRepo);
    }
}