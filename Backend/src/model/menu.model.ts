import { menu } from '../entity/menu.entity';
import { GlobalModel } from "./global.model";
import { menuRepo } from "../repository/menu.repo";


export class menuModel extends GlobalModel<menu>{
    constructor(){
        super(menuRepo);
    }
}