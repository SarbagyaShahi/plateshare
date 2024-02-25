import { Response } from "express"
import { Singleton } from "./singleton"

export interface NotificationInterface{
    message:string,
    title:string
    createdAt:Date,
}

export class NodeDisconnectError extends Error{
    constructor(){
        super("Node disconnected")
    }
}

@Singleton()
export class NotificationObservable{

    static instance:NotificationObservable| undefined

    constructor(
        private staffSubcriber=new Map<String,NotificationObserver[]>(),
        private userSubcriber=new Map<String,NotificationObserver[]>()
    ){}


    subscribeUser=(userId:string,observer:NotificationObserver)=>{
        let nodes=this.userSubcriber.get(userId)
        if(!nodes)
            return this.userSubcriber.set(userId,[observer])
        nodes.push(observer)
    }

    notifyAllUser=async (message:NotificationInterface)=>{
        for(let i of this.userSubcriber.keys()){
            this.userSubcriber.get(i).forEach(observer=>{
                observer.notify(message)
            })
        }
    }
    
    notifyOneUser=async (userId:string,message:NotificationInterface)=>{
        let observer=this.userSubcriber.get(userId)
        if(!observer)
            return false
        observer.forEach(ob=>{
                ob.notify(message)
        })
        return true
    }

    removeUserObserver=(userId:String, observer:NotificationObserver)=>{
        if(!this.userSubcriber.has(userId))
            return
        let subscriber=this.userSubcriber.get(userId)
        let index=subscriber.indexOf(observer)
        if(index <0)
            return
        subscriber.splice(index,1)
    }

}

export class NotificationObserver{
    private client:Response
    userId:string
    constructor(userId:string,client:Response){
        this.client=client
        this.userId=userId
    }

    notify=async (message:NotificationInterface)=>{
        this.client.write('event: message\n')
        this.client.write(`data: ${JSON.stringify(message)}\n\n`,(e:any)=>{
            if(e)
                new NotificationObservable().removeUserObserver(this.userId,this)
        })
    }

    subscribeUser=()=>{
        let observable=new NotificationObservable()
        observable.subscribeUser(this.userId, this)
    }
}