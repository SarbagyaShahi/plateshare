import { global_settings } from "../bootstrap/config";
import { NotificationObservable } from "../lib/notification.lib";
import { OtpMessage } from "../lib/otphandler.lib";
import { global_login_store } from "../store/store.global";
import { Role } from "../typings/base.type";
import { generateToken } from "../utils/base.util";
import { HttpLogger } from "../utils/logger.util";


export const notificationObserver = new NotificationObservable()


export const logger=new HttpLogger(global_settings.log.httpLog,
  global_settings.log.errorLog,
  global_settings.log.emailLog,
  global_settings.log.smsLog,
  global_settings.log.smsErrorLog,
  global_settings.log.directory
  )

export const otp_handler=new OtpMessage({
        apiKey: global_settings.sms.apiKey,
        url: global_settings.sms.url,
        exp: 60000,
        msg: "",
        routeId: 116,
        type: "text",
        password: "",
        senderId: "NEST_Alert",
        campaign: 6544,
        username: ""
    },{
        auth:{
        password:global_settings.mail.password,
        username:global_settings.mail.username
        },
        port:587,
        secure:false,
        host:global_settings.mail.host
})

export function  sendVerificationMail(email:string,userId:string,subject:string,html:string){
    return otp_handler.sendOtpMail({
      from:global_settings.mail.from,
      to:email,subject,
      html  //TODO: Change this format to proper html format
    })
  }

export function sendVerificationOtp(userId:string,number:string,role:Role){
    let token=generateToken(global_settings.secrets.authentication_user,{userId,role})
    otp_handler.sendOtpMessage([number]).catch(console.log)
    global_login_store.set_secondary_token(userId,token)
    return token
}