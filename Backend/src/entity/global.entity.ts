import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { string } from "yup";

export class GlobalEntity{

    @PrimaryGeneratedColumn()
    Userid:string 
}


