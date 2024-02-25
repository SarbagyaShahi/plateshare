import { CookieOptions, Response } from "express";

export function setCookie(res:Response,name:string,value:any,option: CookieOptions){
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.header("")
    res.cookie(name,value,{
      maxAge:10*12*30*24*60*60*60*1000,path:"/",
      // secure:true,
      // sameSite:"none"
    })
}