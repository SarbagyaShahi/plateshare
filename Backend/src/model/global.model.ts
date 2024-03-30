import { FindManyOptions, FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { logger } from "../global/global";
import { global_settings } from "../bootstrap/config";

export class GlobalModel<T extends QueryDeepPartialEntity<T>>{

    repo:Repository<T>
    constructor(repo:Repository<T>){
        this.repo=repo
    }

    create(object: T) {
        return this.repo.insert(object)
    }

    save(object: T) {
        return this.repo.save(object)
    }

    find(option:FindManyOptions<T>): Promise<T[]> {
        return this.repo.find(option)
    }

    findOne(option:FindManyOptions<T>): Promise<T | null> {
        return this.repo.findOne(option)
    }

    // TODO: Change settings preferences
    paginationResult(skip:number,option:FindManyOptions<T>){
        let take=global_settings.general.pagination
        return this.repo.find({skip,take,...option})
    }

    count(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], relations?: FindOptionsRelations<T> | null, skip?: number, order?: FindOptionsOrder<T>) {
        return this.repo.count({ where, relations, skip, order })
    }

    findByCount(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], relations?: FindOptionsRelations<T> | null, skip?: number, order?: FindOptionsOrder<T>) {
        return this.repo.findAndCount({ where, relations, skip, order })
    }

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