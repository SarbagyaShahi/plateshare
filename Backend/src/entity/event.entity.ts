import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';
import { ImageField } from '../lib/imageHandler';

@Entity()
export class event extends GlobalEntity {
    @Column()
    event_name: string
    @Column()
    event_location: string
    @Column()
    event_time:number
    @Column()
    event_description:string
    @Column()
    event_Image:string

}