import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { menu } from './menu.entity';
import { User } from './user.entity';

@Entity()
export class order extends GlobalEntity{

   
    @Column()
    order_location:string 

    @Column()
    order_totalprice:number

    @Column()
    ordered_by:string

    @ManyToMany(()=>menu)
    @JoinTable()
    items:menu[]
}