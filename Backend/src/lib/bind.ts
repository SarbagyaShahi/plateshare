import "reflect-metadata"
import { NextFunction, Request, Response, Router } from "express";
import { CustomError } from "../middleware/error.middleware";
import { ValidationError } from "yup";
import { logger } from "../global/global"; 
import { responseHandler } from "../utils/responseHandler.util";
import { ImageHandler, image_handler } from "./imageHandler";

/**
 * Decorator for binding object with it's prototype doesn't support method decorator
 * @param constructor class with property and method for binding
 * @returns new class that with a constructor that returns a object of param class binded with the prototype
 * @deprecated
 */
export function ControlleBind<T extends new (...args: any[]) => any>(constructor: T){
    let _return_class=class {
        // Constructor that takes the argument of class T then creates a instance of T and binds the prototype behavior to the instance 
        constructor(...args:ConstructorParameters<T>){
            let classInstance=new constructor(...args) // Creating an instance of the class
            for (const key of Object.getOwnPropertyNames(constructor.prototype)) { // Getting name of all properties of the prototype object
                let descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, key);   // Getting descriptor of all the property from prototype
                if (typeof descriptor?.value === 'function'){
                    // Adding additional code to the function like error handling, responseHandler
                    let _original_value=descriptor?.value
                    descriptor.value=async function (...args:[Request,Response,NextFunction]){
                        try {
                            let result=await _original_value.apply(this,args)
                            if(!result)
                                return 
                            else
                                responseHandler(args[1],result)
                        }
                        catch (e: any) {
                            if(args[0] instanceof ImageHandler)
                                image_handler.delete(args[0])
                            if (e instanceof CustomError)
                                return args[2](e)
                            if (e instanceof ValidationError)
                                return args[2](new CustomError(e.message,400))
                            logger.errorLogger(args[0],e)
                            args[1].statusCode = 500
                            return args[1].json({
                                message: e.message
                            })
                        }
                    }
                    descriptor.value = descriptor.value.bind(classInstance);   //Binding functions to the class instance with properties
                }
                Object.defineProperty(constructor.prototype, key, descriptor as any);
            }
            return classInstance
        }
    } as T

    // Binding static property to the return class from param class 
    for (const key of Object.getOwnPropertyNames(constructor)) {
        let descriptor:any = Object.getOwnPropertyDescriptor(constructor, key);
        Object.defineProperty(_return_class, key, descriptor);
    }
    return _return_class
}

/**
 * Decorator for binding object with it's prototype used with method decorator
 * @param constructor class with property and method for binding
 * @returns new class that with a constructor that returns a object of param class binded with the prototype
 */
export function Controller(path:string,args:any[]=[]){
    return <T extends new (...args:any[])=>any>(constructor:T)=>{
        // Setting router for controller and assigning path
        let router=Router()
        router.route(path)
        // Binding nested route to parent routes
        if(args)
            args.forEach(controller=>{
                Reflect.getMetadataKeys(controller).forEach(name=>{
                    let metaData=Reflect.getMetadata(name,controller)
                    if(metaData.router){
                        router.use(metaData.path,metaData.router)
                    }
                })
            })

         // Constructor that takes the argument of class T then creates a instance of T and binds the prototype behavior to the instance 
        let _return_class=class{
            constructor(...args:ConstructorParameters<T>){
                let classInstance=new constructor(...args) // Creating an instance from argument constructor
                for (let i of Object.getOwnPropertyNames(constructor.prototype)){   // Getting name of all properties of the prototype object
                    let descriptor=Object.getOwnPropertyDescriptor(constructor.prototype,i)  // Getting descriptor of all the property from prototype
                    if (typeof descriptor.value =="function"){
                        descriptor.value=descriptor.value.bind(classInstance)   //Binding functions to the class instance with properties
                    }
                }
                Reflect.getMetadataKeys(constructor.prototype).forEach(
                    (name)=>_attach_route_meta(name,router,Reflect.getMetadata(name,constructor.prototype),classInstance)
                    )
                Reflect.defineMetadata(path,{router:router,path:path},classInstance)
                return classInstance
            }
        } as T
        // Binding static property to the return class from param class 
        for (const key of Object.getOwnPropertyNames(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
            Object.defineProperty(_return_class, key, descriptor);
        }
        return _return_class
    }
    
}

function _attach_route_meta(path:string,router:any,urlDescriptor:any, instance:Object){
    // extending the function descriptor value
    let _original_value=urlDescriptor.descriptor.value  //Storing fucntinon descriptor value 
    urlDescriptor.descriptor.value=async function (...args:any[]){  //Defining descriptor
        try {
            let result=await _original_value.apply(this,args)
            if(!result)
                return 
            else{
                responseHandler(args[1],result)
            }
        }
        catch (e: any) {
            console.log(e)
            if(args[0].imageHandler)
                image_handler.delete(args[0])
            if (e instanceof CustomError)
                return args[2](e)
            if (e instanceof ValidationError)
                return args[2](new CustomError(e.message,400))
            logger.errorLogger(args[0],e)
            args[1].statusCode = 500
            return args[1].json({
                message: e.message
            })
        }
    }
    urlDescriptor.descriptor.value=urlDescriptor.descriptor.value.bind(instance) //Binding functions to the class instance with properties
    router[`${urlDescriptor.method}`](path.split("\r\r\n\n")[1],urlDescriptor.descriptor.value)  // Attaching function to route with it's method protocol and url path
}