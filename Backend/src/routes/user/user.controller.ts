import { Controller } from "../../lib/bind";
import { Get } from "../../lib/methods";

@Controller("/user")
export class UserController{
    constructor(

    ){}

    @Get("/get-user")
    getUser(){
        return {message:"Hello User"}
    }

    @Get("/")
    getU(){
        return {message:"Hello Usesr"}
    }
}