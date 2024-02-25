import * as amqplib from "amqplib"
import { SmsCallerInterface } from "../typings/smsCaller.type"


export class ConnectionError extends Error{
    constructor(message="No broker connectino found"){
        super(message)
    }
}

export class MessageNotSentError extends Error{
    constructor(message?:string){
        super(message)
    }
}
export class MessageSenderClient{

    protected url:string
    protected connection:amqplib.Connection
    private channel:amqplib.Channel
    protected smsSendQueue:string
    protected smsAckQueue:string
    protected receiveTask:Function
    // private sendSmsQueue:

    constructor(url:string,sendQueue:string,recieveQueue:string,recieveTask:Function){
        this.smsSendQueue=sendQueue
        this.smsAckQueue=recieveQueue
        this.receiveTask=recieveTask
        this.url=url

        amqplib.connect(this.url).then(connection=>{
            this.connection=connection
            this.createChannel().then(e=>{
                this.recieveMessage()
            })
        }).catch(e=>{
            throw e
        })
    }

    async assertQueue(channel:amqplib.Channel,queue:string){
        try{
            await channel.assertQueue(queue,{durable:false})
            return true
        }
        catch(e){
            return false
        }
    }

    async createChannel(){
        if (this.connection){
            this.channel =await this.connection.createChannel()
            return true
        }
        throw new ConnectionError()
    }

    async sendMessage(message:SmsCallerInterface){
        if (this.channel){
            this.channel.sendToQueue(this.smsSendQueue,Buffer.from(JSON.stringify(message)),{replyTo:this.smsAckQueue})
            console.log("Here")
            return
        }
        throw new ConnectionError("No channel found")
    }

    async recieveMessage(){
        await this.channel.assertQueue(this.smsAckQueue) 
        this.channel.consume(this.smsAckQueue,message=>this.receiveTask(message),{})
    }
}
