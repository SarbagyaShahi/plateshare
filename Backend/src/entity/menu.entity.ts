import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';

@Entity()
export class menu extends GlobalEntity{
    @Column()
    menu_name:string

    @Column()
    menu_type:string

    @Column()
    menu_price:number

}