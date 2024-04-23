import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { menu } from './menu.entity';

@Entity()
export class order extends GlobalEntity{

    @Column()
    order_price:number
   
    @Column()
    order_location:string 

    @ManyToMany(()=>menu)
    @JoinTable()
    items:menu[]
}