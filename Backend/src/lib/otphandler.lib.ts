import { Mailer, MailerConfig, MessageMailInterface } from "../lib/mailer.lib";
import { MessageHandler, MessageOption } from "../lib/sms.lib";
import { CustomError } from "../middleware/error.middleware"
import * as crypto from "crypto"
import * as dotenv from "dotenv"
import { Singleton } from "./singleton";

dotenv.config({})

class OtpSentError extends CustomError {
    constructor(message: string, statusCode: number) {
        super(message, statusCode)
    }
}

export interface OtpMessageOption extends MessageOption {
    apiKey: string
    url: string
}


class OtpGenerator {
    private static readonly otpLength: number = Number(process.env.OTP_LENGTH);

    public static generateOtp(): string {
      let otp = '';
      for (let i = 0; i < OtpGenerator.otpLength; i++) {
        otp += Math.floor(crypto.randomInt(0, 10)).toString();
      }
      return otp;
    }
}


@Singleton()
export class OtpMessage {

    option: OtpMessageOption
    public static validOtp: string[] = []
    sms:MessageHandler
    static exp:number
    mail:Mailer

    constructor(option?: OtpMessageOption, optionMailer?:MailerConfig,exp=60000) {
        OtpMessage.exp=exp
        if(option)
            this.sms=new MessageHandler(option.apiKey,option.url)
        if(optionMailer)
            this.mail=new Mailer(optionMailer)
        this.option = option
    }

    async sendOtpMessage(contact: string[]): Promise<boolean> {
        let otp = OtpGenerator.generateOtp()
        this.option.msg += `\n${otp}`
        try {
            await this.sms.sendMessage(this.option, contact)
            console.log(otp)
            OtpMessage.validOtp.push(otp)
            return true
        }
        catch (e: any) {
            throw new OtpSentError(e.message, 400)
        }
    }

    public static getOtp=()=>{
        let otp=OtpGenerator.generateOtp()
        OtpMessage.clearOtp(otp)
        return otp
    }

    async sendOtpMail(messageOpt:MessageMailInterface){
        await this.mail.sendMail(messageOpt)
        return {
            message:"Otp sent success"
        }
    }

    static clearOtp(otp: string) {
        setInterval(() => {
            var index = OtpMessage.validOtp.indexOf(otp);
            if (index > -1) {
                OtpMessage.validOtp.splice(index, 1)[0];
            }
        }, this.exp)
    }

    verifyOtp(otp: string) {
        if(!otp) return false
        let length = OtpMessage.validOtp.length
        OtpMessage.validOtp = OtpMessage.validOtp.filter((valid) => {
            return otp !== valid
        })
        return (length !== OtpMessage.validOtp.length) ? true : false
    }
}
