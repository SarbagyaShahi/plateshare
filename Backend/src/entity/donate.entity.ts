import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';
import { ImageField } from '../lib/imageHandler';

@Entity()
export class donate extends GlobalEntity {
    @Column()
    donate_name: string
    @Column()
    donated_by: string
    @Column()
    donated_price: number
    @Column()
    donation_location: string


}