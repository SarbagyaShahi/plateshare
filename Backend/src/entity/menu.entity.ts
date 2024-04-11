import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';
import { ImageField } from '../lib/imageHandler';

@Entity()
export class menu extends GlobalEntity{
    @Column()
    menu_name:string
    @Column()
    menu_Image:string

    @Column()
    menu_type:string
    

    @Column()
    menu_price:number
    @Column()
    
    menu_rating:number
    


}