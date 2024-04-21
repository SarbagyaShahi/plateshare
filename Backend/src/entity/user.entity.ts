import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';

@Entity()
export class User extends GlobalEntity{
    @Column()
    User_name:string

    @Column()
    User_email:string

    @Column()
    User_password:string

    @Column()
    User_address: string;
    
    @Column()
    User_Phone: string;

   

    @Column({type:"enum",enum:Role,default:Role.USER})
    role:Role
}
