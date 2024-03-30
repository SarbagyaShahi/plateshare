import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

export class GlobalEntity{

    @PrimaryGeneratedColumn()
    Userid:string
}
