import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { string } from "yup";
import {menu} from "./menu.entity"
import { order } from "./order.entity";

export class GlobalEntity{

    @PrimaryGeneratedColumn()
    Id:string 
}


