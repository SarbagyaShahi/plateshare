import { Request } from "express"

export enum ActionType{
    ORDER= "order",
    MESSAGE= "message",
    CAMPAIGN= "campaign",
    DYNAMIC_MESSAGE= "dynamic_message"
}

export enum Role{
    ADMIN="admin",
    NGO="ngo",
    USER="user",
}

export enum GENDER{
    MALE="male",
    FEMALE="female",
    NONE="none"
}

export enum LANGUAGE{
    ENGLISH="english",
    NEPALI="nepali"
}

export enum APPREANCE{
    DARK="dark",
    LIGHT="light"
}

export enum AGE_GROUP{
    MINOR="minor", //(<18)
    ADULT="adult", //(19-35)
    MIDLIFE="midlife", //(36-50)
    SENOIRS="seniors", //(>50)
    NONE="none"
}

export enum PAYMENT_METHOD{
    CASH="cash",
    CREDIT="credit",
    DEBIT="debit",
    FONE_PAY="fonepay",
    ESEWA="esewa",
    KAHLTI="khalti",
    CONNECT_IPS="connect_ips",
    MOBILE_PAYMENT="mobile",
    GIFT_CARD="gift",
    NONE="none"
}

export enum MESSAGE_STATUS{
    PENDING="pending",
    DELIVERED="sent",
    FAILED="failed",
    ALL="all"
}

// export enum ORGANIZATION{
//     STUDENT="student",
    
// }


export interface File{
    filename:string,
    mimetype:string
    extType:string
    buffer?:Buffer[]
    fileSize:number
}

export interface FileRequests extends Request{  //File can only be uploaded by logged in user
    requestFile?:File[]
}

export interface Token{
    userId:string
    role:Role
  }
  
export interface AuthorizedFileRequest extends FileRequests{
    user:Token
}

export interface VerificaitonRequest extends Request{
    user:{
        userId:string
    }
}

export interface AuthorizedRequest extends Request{
    user:{
        userId:string
    }
    token:string
}

export interface StaffRequest extends Request{
    user:Token
    token:string
}