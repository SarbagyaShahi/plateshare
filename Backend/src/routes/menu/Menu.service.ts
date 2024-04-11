import { menu } from '../../entity/menu.entity';
import { menuModel } from '../../model/menu.model';
import { menuDto } from './Menu.dto';
import { Post, Get, Put } from '../../lib/methods';

export class menuService {
    constructor(
        private menu_model = new menuModel()
    ) { }
    
    async createmenu(create: menuDto) {
        //   let order_name= await this.order_model.findOne({where:{ordername : create.ordername}}); 
        let menus = new menu()//檢
        menus.menu_name = create.menu_name;
        menus.menu_type = create.menu_type;
        menus.menu_price = create.menu_price;
        
        menus.menu_rating = create.menu_rating;
        menus.menu_Image = create.menu_Image;
        
        await this.menu_model.create(menus)
        return ('menu is created')
    }
    async getmenus(read:menuDto){
        let menus = await this.menu_model.find({});
        return {data:menus}
    }

    async Putmenus(Put:menuDto,){
        let menus = await this.menu_model.findOne({where:{id:Put.Id } });
        // menus.menu_name = Put.menu_name
        menus.menu_type = Put.menu_type;
        menus.menu_price = Put.menu_price;
        menus.menu_rating = Put.menu_rating;
        menus.menu_Image= Put.menu_Image?Put.menu_Image:menus.menu_Image
        await this.menu_model.save(menus)
        return ('menu is edited')
    }
//     async Deletemenus(Delete:menuDto){
//         let menus = new menu()//檢
//         menus.menu_name = Delete.menu_name;
//         menus.menu_type = Delete.menu_type;
//         menus.menu_price = Delete.menu_price;
//         menus.menu_rating = Delete.menu_rating;
       
//         await this.menu_model.delete(menus)
//         return ('menu is deleted')
//     }
}
