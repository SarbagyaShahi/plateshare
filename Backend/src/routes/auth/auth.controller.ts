import { Controller } from "../../lib/bind";
import { Request,Response } from "express";
import { Delete, Get, Post } from "../../lib/methods";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from './authservice';
import { LoginGuard } from "../../guards/role.guard";

@Controller("/auth")
export class AuthController {
    constructor(
        private service=new AuthService()
    ) {
    }

    @Post("/register")
    async (req:Request){
        let body:RegisterDto=req.body
        let message=this.service.register(body)
        return message
    }

   
    @Post("/login")
    login(req:Request,res:Response){
        let body:LoginDto=req.body
        let message=this.service.login(body,res)
        return message


    }

    @Get("/authorized")
    @LoginGuard()
    async authorizd(req:Request){
        return {message:"Hi there"}
    }
}
