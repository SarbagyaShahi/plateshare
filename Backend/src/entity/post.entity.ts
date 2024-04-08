import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';

@Entity()
export class post extends GlobalEntity {
    @Column()
    post_name: string

    @Column()
    posted_ingredients: string

    @Column()
    post_description: string

    @Column()
    posted_by: string


}