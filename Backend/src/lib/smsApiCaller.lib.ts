import { SmsCallerInterface } from "../typings/smsCaller.type";
import { MessageBrokerReciever, MessageBrokerSender } from "./broker.lib";
import * as amqp from "amqplib";
import { Singleton } from "./singleton";

@Singleton()
export class SmsApiCaller{
    private sendChannel:amqp.Channel
    private recieveChannel:amqp.Channel
    sendQueue:string
    private recieveQueue:string
    private recieveHandler:Function
    constructor(
        private smsBrokerSender=new MessageBrokerSender(""),
        private smsBrokerReciever=new MessageBrokerReciever("")
    ){
        
    }

    async connectSendQueue(queue:string){
        try{
            await this.smsBrokerSender.connect()
            this.sendChannel=await this.smsBrokerSender.createChannel()
            await this.sendChannel.assertQueue(queue)
            this.sendQueue=queue
            return true
        }
        catch(e){
            return false
        }
    }

    async conenctRecieveQueue(queue:string){
        try{
            await this.smsBrokerSender.connect()
            this.recieveChannel=await this.smsBrokerReciever.createChannel()
            await this.recieveChannel.assertQueue(queue)
            this.recieveQueue=queue
            return true
        }
        catch(e){
            return false
        }
    }

    callSmsHandler(message:SmsCallerInterface){
        return this.sendChannel.sendToQueue(this.sendQueue,Buffer.from(JSON.stringify(message)))
    }

    smsLogUpdate(remoteLogHandler:Function){
        
    }
}