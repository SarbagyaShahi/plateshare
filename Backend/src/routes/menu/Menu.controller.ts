import { Controller } from "../../lib/bind"
import { Delete, Get, Post, Put } from "../../lib/methods"
import { AuthorizedRequest } from "../../typings/base.type"
import { menuService } from "./Menu.service"

@Controller("/Menu")
export class  MenuController {  
    constructor(
        private service=new menuService()
    ) {
    }

    @Post("/create_menu")
    async create (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.createmenu(body)
        return message
    }
    @Get("/get_menu")
    async read (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.getmenus(body)
        return message
    }
    @Delete("/delete_menu")
    async Delete (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.Deletemenus(body)
        return message
    }
}