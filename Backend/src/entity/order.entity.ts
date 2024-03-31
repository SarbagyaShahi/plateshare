import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';

@Entity()
export class order extends GlobalEntity{
    @Column()
    order_name:string

    @Column()
    order_type:string

    @Column()
    order_price:number

}