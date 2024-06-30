import {Transporter, createTransport} from "nodemailer"
import SMTPTransport = require("nodemailer/lib/smtp-transport")
import { Stream } from "stream"
import { Model, Singleton } from "./singleton"
import * as dotenv from "dotenv"
import { logger } from "../global/global"
import { global_settings } from "../bootstrap/config"
dotenv.config()

export interface MailAuth{
    username:string,
    password:string,
}

export class MailConnectionError extends  Error{
    constructor(messag:string) {
        super(messag)
    }
}

export class MailSendError extends Error{
    constructor(){
        super()
    }
}

export interface MailerConfig{
    host?:string,
    auth?:MailAuth,
    port?:number,
    secure?:boolean,
}

export interface MailAttachment{
    filename:string,
    content?:Stream | Buffer | string
    path?:string
    raw?:string
}

export interface MessageMailInterface{
    from:string,
    to:string,
    subject?:string,
    bcc?:string,
    cc?:string,
    text?:string,
    html?:string,
    attachment?:MailAttachment
}

export class TemplateEngine {
    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    public render(context: {[key: string]: string}): string {
        return this.template.replace(/\{\{(\w+)\}\}/g, (_match, capture) => context[capture] || '');
    }
}

@Singleton()
export class Mailer{
    transport:Transporter<SMTPTransport.SentMessageInfo>

    constructor (private config:MailerConfig){
        this.connect()
    }

    connect=()=>{
        try{
            this.transport=createTransport({
                host:this.config.host,
                auth:{
                    user:this.config.auth.username,
                    pass:this.config.auth.password,
                },
                secure:this.config.secure,
                port:this.config.port,
                connectionTimeout:10000,
                socketTimeout:10000
            })
        }
        catch(e){
            throw new MailConnectionError(e.message)
        }
    }

    sendMail= async (message:MessageMailInterface)=>{
        this.transport
        .sendMail(message).catch((e: any)=>logger.emailLogger(e,message.from,message.to))
        return {
            message:"Mail sent seccess"
        }
    }

    sendMailHTML=async(email:string,template:string,subject:string)=>{
        this.sendMail({
            from: global_settings.mail.from,
            to: email,
            html:template,
            subject
        })
    }
}

@Model()
export class EmailMailer extends Mailer{
    constructor(config:MailerConfig){
        super(config)
    }
}
// export const email_mailer=new EmailMailer({
//     auth:{
//             username:setting.setting.mail.auth.username,
//             password:setting.setting.mail.auth.password
//         },
//     host:setting.setting.mail.host,
//     port:setting.setting.mail.port,
//     secure:true
// })