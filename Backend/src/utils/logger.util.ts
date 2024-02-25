import morgan from "morgan"
import fs from "fs"
import { Request } from "express"
import dotenv from "dotenv"
import path from "path"
import { MailSendError } from "../lib/mailer.lib"
dotenv.config()

export class HttpLogger{

    requestStream:fs.WriteStream
    errorStream:fs.WriteStream
    emailStream:fs.WriteStream
    smsStream:fs.WriteStream
    smsErrorStream:fs.WriteStream
    static instance:HttpLogger

    constructor(httpFilePath:string="http.log", errorFilePath:string="error.log",emailFilePath="email.log",smsLogFileName="sms.log",smsError="smsError.log",directory:string){
        // Sinlge instance of logger through out the process
        if(HttpLogger.instance instanceof HttpLogger) return HttpLogger.instance
        HttpLogger.instance=this
        if(!fs.existsSync(directory))
            fs.mkdirSync(directory)
        
        // Creating a write stream
        this.requestStream=fs.createWriteStream(path.join(directory,httpFilePath), {flags:'a'})
        this.errorStream=fs.createWriteStream(path.join(directory,errorFilePath), {flags:'a'})
        this.emailStream=fs.createWriteStream(path.join(directory,emailFilePath), {flags:'a'})
        this.smsStream=fs.createWriteStream(path.join(directory,smsLogFileName), {flags:'a'})
        this.smsErrorStream=fs.createWriteStream(path.join(directory,smsError), {flags:'a'})
        return this
    }

    httpRequestLogger=()=>{
        let stream=this.requestStream
        return morgan("combined", {
            skip: function (req, res) { return res.statusCode == 404 },
            stream,
        })
    }

    errorLogger=(req:Request,message:Error)=>{
        let date=new Date()
        let formatMessage=""
        let totalSpace=100
        let logHeader=req?
            req.path+" "+ `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`:
            `Internal database query ${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        let times=(totalSpace-logHeader.length)/2
        formatMessage+="-".repeat(times)
        formatMessage+= logHeader
        formatMessage+="-".repeat(times)+"\n\n"
        formatMessage+=message.stack
        formatMessage+="\n\n"+"-".repeat(totalSpace)+"\n\n"
        this.errorStream.write(formatMessage)
    }

    emailLogger=(err:MailSendError,from:string,to:string)=>{
            let date=new Date()
            let formatMessage=""
            let totalSpace=100
            let logHeader=`Email sent from ${from} to ${to} failed at ${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()+1}:${date.getSeconds()}`
            let times=(totalSpace-logHeader.length)/2
            formatMessage+="-".repeat(times)
            formatMessage+= logHeader
            formatMessage+="-".repeat(times)+"\n\n"
            formatMessage+=err.stack
            formatMessage+="\n\n"+"-".repeat(totalSpace)+"\n\n"
            this.emailStream.write(formatMessage)
    }
}
