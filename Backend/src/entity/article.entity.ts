import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GlobalEntity } from "./global.entity"
import { Role } from '../typings/base.type';
import { ImageField } from '../lib/imageHandler';

@Entity()
export class article extends GlobalEntity {
    @Column()
    article_topic: string

    @Column()
    article_description: string
     
    @Column()
    article_publisheddate: Date

}