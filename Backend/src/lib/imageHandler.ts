import { Stream } from "stream";
import busboy from "busboy";
import { FileSizeExceed, InvalidInputError } from "../middleware/error.middleware";
import * as path from "path"
import * as fs from "fs"
import { AuthorizedRequest, File, FileRequests } from "../typings/base.type";
import { Singleton } from "./singleton";
import sharp from "sharp"
import { generateRandomString } from "../utils/base.util";
import { NextFunction, Request } from "express";
import { global_settings } from "../bootstrap/config";


export interface Fields {
    name: string,
    count: number
}

@Singleton()
export class ImageHandler{
    filepath:string
    mimeType:RegExp
    fileSize:number
    compressedPath:string
    constructor(path:string, mimeType:RegExp=/^.*$/, fileSize:number=50000,compressedPath:string){
        this.filepath=path
        this.compressedPath=compressedPath
        this.mimeType=mimeType
        this.fileSize=fileSize
        if(!fs.existsSync(this.filepath))
        {
            fs.mkdirSync(this.filepath)
        }
    }

    storeFile(file:Buffer,name:string){
        fs.writeFile(`${this.filepath}/${name}`,file,(err)=>{})
    }

    // TODO: Change compression to suitable format
    async compressImage(file:Buffer,name:string){
        sharp(file).png({quality:70,compressionLevel:4}).jpeg({quality:70}).toFile(path.join(this.compressedPath,name), (err, info) => {})
    }

    filterFile(regTest:RegExp,mimeType:string,fileLength:number){
        if(fileLength > this.fileSize )
            return false
        if(!regTest.test(mimeType))
            return false
        return true
    }

    singleImage(req:Request,name:string){
        return this.requestImageHandler(req,[{name,count:1}])
    }

    multipleImage(req:Request,{name,count}:Fields){
        return this.requestImageHandler(req,[{name,count}])
    }

    fieldImage(req:Request,field:Fields[]){
        return this.requestImageHandler(req,field)
    }

    singleFile(req:Request,name:string){
        return this.requsetFileHandler(req,[{name,count:1}])
    }

    multipleFile(req:Request,{name,count}:Fields){
        return this.requsetFileHandler(req,[{name,count}])
    }

    fieldFile(req:Request,field:Fields[]){
        return this.requsetFileHandler(req,field)
    }

    delete(req: FileRequests) {
        let files:File[]
        files = req.requestFile
        if(files instanceof Array)
            return files.forEach(file=>{
                fs.unlinkSync(path.join(global_settings.static.image, file.filename))
            })
    }

    requsetFileHandler(req:Request,field:Fields[]){
        return new Promise<FileRequests>((resolve,reject)=>{
            let newRequest:FileRequests=req
            if(!req.headers["content-type"] || req.headers["content-type"].split(";")[0]!=="multipart/form-data")
                reject(new InvalidInputError("Bad request need multipart form data"))
            const bb = busboy({headers:req.headers})
            bb.on('file', (fieldname:string, file:Stream, {filename, encoding, mimeType}:any) => {
                let fileLength=0
                let fileExt=path.extname(filename)
                let fileBuff:Buffer[]=[]
                file.on("data",(data)=>{
                    fileLength=fileLength+data.length
                    fileBuff.push(data)
                })
                file.on("end",()=>{

                        if(!this.filterFile(/^application\/pdf$/,mimeType,fileLength))
                            return reject(new FileSizeExceed("MimeType or size doesn't match"))
                        // let newDate=generateRandomString(10)
                        // filename=newDate+fileExt
                        newRequest.body[fieldname] = filename;
                        let index=-1
                        for (let i=0;i<field.length;i++){
                            if(field[i].name==fieldname){
                                index=i
                                break
                            }
                        }
                        if(index>-1){
                            if(field[index].count >= 1)
                                if(!newRequest.requestFile)
                                    newRequest.requestFile=[{extType:fileExt,filename:filename,buffer:fileBuff,fileSize:fileLength,mimetype:mimeType}]
                                else
                                    newRequest.requestFile.push({extType:fileExt,filename:filename,fileSize:fileLength,mimetype:mimeType,buffer:fileBuff})
                            field[index].count=field[index].count-1
                        }
                })

            })

            bb.on('field', (fieldname:any, val:any) => {
                newRequest.body[fieldname] = val;
            });

            bb.on("close",async ()=>{
                resolve(newRequest)
            })

            bb.on("error",()=>{
                reject(new Error("Unexpected error occured"))
            })
            req.pipe(bb)
        })
    }

    requestImageHandler(req:Request,field:Fields[]){
        return new Promise<FileRequests>((resolve,reject)=>{
            let newRequest:FileRequests=req
            if(!req.headers["content-type"] || req.headers["content-type"].split(";")[0]!=="multipart/form-data")
                reject(new InvalidInputError("Bad request need multipart form data"))
            const bb = busboy({headers:req.headers})
            bb.on('file', (fieldname:string, file:Stream, {filename, encoding, mimeType}:any) => {
                let fileLength=0
                let fileExt=path.extname(filename)
                let fileBuff:Buffer[]=[]
                file.on("data",(data)=>{
                    fileLength=fileLength+data.length
                    fileBuff.push(data)
                })
                file.on("end",()=>{
                        if(!this.filterFile(this.mimeType,mimeType,fileLength))
                            return reject(new FileSizeExceed("MimeType or size doesn't match"))
                        let newDate=generateRandomString(10)
                        filename=newDate+fileExt
                        newRequest.body[fieldname] = filename;
                        if(!newRequest.requestFile)
                            newRequest.requestFile=[{extType:fileExt,buffer:fileBuff,filename:filename,fileSize:fileLength,mimetype:mimeType}]
                        else
                            newRequest.requestFile.push({extType:fileExt,buffer:fileBuff,filename:filename,fileSize:fileLength,mimetype:mimeType})
                        let index=-1
                        for (let i=0;i<field.length;i++){
                            if(field[i].name==fieldname){
                                index=i
                                break
                            }
                        }
                        if(index>-1){
                            if(field[index].count >= 1)
                            {
                                let buff=Buffer.concat(fileBuff)
                                this.storeFile(buff,filename)
                                this.compressImage(buff,filename)
                            }
                            field[index].count=field[index].count-1
                        }
                })

            })

            bb.on('field', (fieldname:any, val:any) => {
                newRequest.body[fieldname] = val;
            });

            bb.on("close",async ()=>{
                resolve(newRequest)
            })

            bb.on("error",()=>{
                reject(new Error("Unexpected error occured"))
            })
            req.pipe(bb)
        })
    }
}


export function ImageSingle(name:string){
    return (target:Object,propertyName: string,propertDescriptor:PropertyDescriptor)=>{
        let _original_value=propertDescriptor.value
        propertDescriptor.value=async function (...args:[AuthorizedRequest,Response,NextFunction]) {
            let image=await image_handler.singleImage(args[0],name)
            return await _original_value.apply(this,[image,args[1],args[2]]);
        }
        return propertDescriptor
    }
}

export function FileSingle(name:string){
    return (target:Object,propertyName: string,propertDescriptor:PropertyDescriptor)=>{
        let _original_value=propertDescriptor.value
        propertDescriptor.value=async function (...args:[AuthorizedRequest,Response,NextFunction]) {
            let image=await image_handler.singleFile(args[0],name)
            return await _original_value.apply(this,[image,args[1],args[2]]);
        }
        return propertDescriptor
    }
}

export function ImageArray(field:Fields){
    return (target:Object,propertyName: string,propertDescriptor:PropertyDescriptor)=>{
        let _original_value=propertDescriptor.value
        propertDescriptor.value=async function (...args:[AuthorizedRequest,Response,NextFunction]) {
            let image=await image_handler.multipleFile(args[0],field)
            return await _original_value.apply(this,[image,args[1],args[2]]);
        }
        return propertDescriptor
    }
}

export function ImageField(field:Fields[]){
    return (target:Object,propertyName: string,propertDescriptor:PropertyDescriptor)=>{
        let _original_value=propertDescriptor.value
        propertDescriptor.value=async function (...args:[AuthorizedRequest,Response,NextFunction]) {
            let image=await image_handler.fieldFile(args[0],field)
            return await _original_value.apply(this,[image,args[1],args[2]]);
        }
        return propertDescriptor
    }
}

export const image_handler=new ImageHandler(global_settings.static.image,/image\/(bmp|gif|jpeg|jpg|png|svg\+xml|tiff)/,4000000,global_settings.static.compressedImage)
