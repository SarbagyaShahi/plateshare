import { global_settings } from "../bootstrap/config";
import { OtpMessage } from "../lib/otphandler.lib";
import { HttpLogger } from "../utils/logger.util";


export const logger = new HttpLogger(
  global_settings.log.httpLog,
  global_settings.log.errorLog,
  global_settings.log.emailLog,
  global_settings.log.smsLog,
  global_settings.log.smsErrorLog,
  global_settings.log.directory
);

export const otp_handler=new OtpMessage({
  apiKey: global_settings.sms.apiKey,
  url: global_settings.sms.url,
  exp: 60000,
  msg: "",
  routeId: 116,
  type: "text",
  password: "",
  senderId: "Sarbagya Shahi",
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
