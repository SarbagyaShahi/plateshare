import express from "express";
import cookieParser from "cookie-parser"
import { Singleton } from "./singleton";
import cors from "cors"


@Singleton()
export class BspApplication{
    constructor(private application=express(),controllers:Object[]){
        application.use(cors({origin:["http://localhost:3000"],credentials:true}))
        application.use(express.json())
        application.use(cookieParser())

        controllers.forEach(controller=>{
            Reflect.getMetadataKeys(controller).forEach(name=>{
                let metaData=Reflect.getMetadata(name,controller)
                if(metaData.router){
                    this.application.use(metaData.path,metaData.router)
                }
            })
        })
    }

    getApplication(){
        return this.application
    }

    async startApplication(port:any){
        new Promise((resolve,reject)=>{
            this.application.listen(port,()=>{
                console.log(`Server running on port ${port}`)
                resolve("")
            })
        })
        
    }
}