import { FindManyOptions, FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { logger } from "../global/global";
import { global_settings } from "../bootstrap/config";

export class GlobalModel<T extends QueryDeepPartialEntity<T>>{

    repo:Repository<T>
    constructor(repo:Repository<T>){
        this.repo=repo
    }
//Insert new data in database
    create(object: T) {
        return this.repo.insert(object)
    }
//updates the entity
    save(object: T) {
        return this.repo.save(object)
    }
// retrieves multiple entities from the database based on the provided options.
    find(option:FindManyOptions<T>): Promise<T[]> {
        return this.repo.find(option)
    }


    findOne(option:FindManyOptions<T>): Promise<T | null> {
        return this.repo.findOne(option)
    }

 

    count(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], relations?: FindOptionsRelations<T> | null, skip?: number, order?: FindOptionsOrder<T>) {
        return this.repo.count({ where, relations, skip, order })
    }
//The findByCount method retrieves entities and the total count of entities that match the given criteria.
    findByCount(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], relations?: FindOptionsRelations<T> | null, skip?: number, order?: FindOptionsOrder<T>) {
        return this.repo.findAndCount({ where, relations, skip, order })
    }
//removes an entity from the database.

    delete(object: T) {
        return this.repo.remove(object)
    }

    update(object: T) {
        return this.repo.save(object)
    }

    updateSync=async <A extends T>(object:A)=>{
        this.update(object).catch((e)=>{
            logger.errorLogger(undefined,e)
        })
    }

    createSync=async <A extends T>(object:A)=>{
        this.create(object).catch((e)=>{
            logger.errorLogger(undefined,e)
        })
    }

    saveSync=async <A extends T>(object:A)=>{
        this.save(object).catch((e)=>{
            logger.errorLogger(undefined,e)
        })
    }
}