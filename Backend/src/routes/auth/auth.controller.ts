import { Controller } from "../../lib/bind";
import { Get } from "../../lib/methods";

@Controller("/auth")
export class AuthController{
    constructor(

    ){}

    @Get("/")
    getUser(){
        return {message:"Hello User"}
    }

}