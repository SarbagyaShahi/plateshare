import { generateRandomString } from "../utils/base.util";
import * as dotenv from "dotenv"
dotenv.config({})

export const global_settings={
    mail:{
        from:"sarbagyashahi894@gmail.com.np",
        username:process.env.MAIL_USERNAME,
        password:process.env.MAIL_PASSWORD,
        host:process.env.MAIL_HOST
    },
    sms:{
        url:process.env.MESSAGE_URL,
        apiKey:process.env.MESSAGE_API,

    },
    secrets:{
        authentication_user:generateRandomString(),
        authentication_staff:generateRandomString()

    },
    oauth:{
        google:{
            client_secret:process.env.GOOGLE_CLIENT_TOKEN,
            client_id:process.env.GOOGLE_CLIENT_ID,
            redirect_uri:process.env.GOOGLE_REDIRECT_URL

        }
    },
    static:{
        image:"./public/images",
        compressedImage:"./public/compress",
        article:"./Assests"
    },
    general:{
        pagination:isNaN(Number(process.env.PAGINATION))?20:Number(process.env.PAGINATION)
    },
    payment:{
        credit_rate:checkCreditRate(Number(process.env.CREDIT_RATE))
    },
    apis_keys:{
        esewa_secretKey:process.env.ESEWA_KEY,
        fonepay_secretKey:process.env.FONEPAY_KEY,
        khalti_secretKey:process.env.KHALTI_KEY,

    },
    message:{
        credit_rate_per_Characters:process.env.CHARACTERS_CREDIT
    },
    
    log:{
        emailLog:process.env.EMAIL_LOG,
        httpLog:process.env.HTTP_LOG,
        errorLog:process.env.ERROR_LOG,
        smsLog:process.env.SMS_LOG,
        smsErrorLog:process.env.SMS_ERROR_LOG,
        directory:process.env.LOG_DIRECTORY
    }

}


function checkCreditRate(value:number| typeof NaN){
    if(isNaN(value))
        throw new Error("Credit not a number check config file")
    return value
}