import { Controller } from "../../lib/bind"
import { ImageSingle } from "../../lib/imageHandler";
import { Delete, Get, Post, Put } from '../../lib/methods';
import { InvalidInputError } from "../../middleware/error.middleware";
import { AuthorizedRequest } from "../../typings/base.type"
import { menuService } from "./Menu.service"

@Controller("/menu")
export class  MenuController {  
    constructor(
        private service=new menuService()
    ) {
    }

    @Post("/create_menu")
    @ImageSingle("menu_Image")
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
    @Put("/put_menu")
    @ImageSingle("food_image")
    async edit (req:AuthorizedRequest){
        let body =req.body
        let message=this.service.Putmenus(body)
        return message
    }
    @Delete("/delete_menu")
    async Delete (req:AuthorizedRequest){
        let param:{id?:string} =req.query
        if(!param.id)
                throw new InvalidInputError("No id found")
        let message=this.service.Deletemenus(param.id)
        return message
    }
}