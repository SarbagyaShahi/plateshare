import { global_settings } from "../bootstrap/config";
import { Singleton } from "../lib/singleton";
import { CustomError, PermissionNotGranted } from "../middleware/error.middleware";
import jwt from "jsonwebtoken"
import { Token } from "../typings/base.type";

@Singleton()
class GlobalStore{

    private login_store=new Map<string,string[]>();
    private secondary_token=new Map<string,string[]>();
    private token_secret:string=global_settings.secrets.authentication_user
    private staff_token_secret:string=global_settings.secrets.authentication_staff

    constructor(){

    }

    private _clear_token=(fn:Function,time:number=60000*5)=>{
        setTimeout(()=>{
            fn()
        },time)
    }

    private _validate_token=(token:string):Token=>{
        let validate=jwt.verify(token,this.token_secret) as Token
        return validate
    }

    private _validate_staff_token=(token:string):Token=>{
        let validate=jwt.verify(token,this.staff_token_secret) as Token
        return validate
    }


    
    private _set_token=(hash:Map<string,string[]>,userId:string,token:string)=>{
        if(!hash.has(userId)){
            hash.set(userId,[token])
        }
        let tokens=hash.get(userId)
        tokens.push(token)
    }

    private _get_token=(hash:Map<string,string[]>,userId:string)=>{
        if(!hash.has(userId))
            return {found:false,tokens:[]}
        return {found:true,tokens:hash.get(userId)}
    }

    private _remove_token=(hash:Map<string,string[]>,userId:string, token:string)=>{
        this._clear_token(()=>{
            if(!hash.has(userId)) return false
            let tokens=hash.get(userId)

            if(tokens.length <= 0) {
                hash.delete(userId)
                return
            }

            let index=tokens.indexOf(token)
            if (index==-1) return
            tokens.splice(index,1)
        })
        return true
    }

    verify_login_token=(token:string)=>{
        if (token == null) throw new CustomError("Token not found", 403);
        let verify=this._validate_token(token)
        let {found,tokens}=this._get_token(this.login_store,verify.userId)
        if(!found || tokens.indexOf(token) <= -1) throw new CustomError("Session expired", 403);
        return verify
    }

    verify_staff_token=(token:string)=>{
        if (token == null) throw new CustomError("Token not found", 403);
        let verify=this._validate_staff_token(token)
        let {found,tokens}=this._get_token(this.login_store,verify.userId)
        if(!found || tokens.indexOf(token) <= -1) throw new CustomError("Session expired", 403);
        return verify
    }

    remove_login_token=(userId:string,token:string)=>{
        if(!this.login_store.has(userId)) return false
        let tokens=this.login_store.get(userId)
        if(tokens.length <= 0) {
            this.login_store.delete(userId)
            return false
        }
        let index=tokens.indexOf(token)
        tokens=[...tokens.slice(0, index), ...tokens.slice(index + 1)];
        tokens.splice(index,1)
        return true
    }

    verify_secondary_token=(token:string)=>{
        if (token == null) throw new CustomError("Token not found", 403);
        let verify=this._validate_token(token)
        let {found,tokens}=this._get_token(this.secondary_token,verify.userId)
        if(!found || tokens.indexOf(token) <= -1) throw new PermissionNotGranted("Token expired")
        let index=tokens.indexOf(token)
        tokens.splice(index,1)
        return verify
    }

    set_login_token=(token:string,userId:string)=>{
        this._set_token(this.login_store,userId,token)
    }

    set_login_token_staff=(token:string,userId:string)=>{
        this._set_token(this.login_store,userId,token)
    }

    set_secondary_token=(userId:string,token:string)=>{
        this._set_token(this.secondary_token,userId,token)
        this._remove_token(this.secondary_token,userId,token)
    }
}

export const global_login_store=new GlobalStore()