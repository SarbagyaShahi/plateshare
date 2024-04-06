import { menu } from '../../entity/menu.entity';
import { menuModel } from '../../model/menu.model';
import { menuDto } from './Menu.dto';
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
        
        await this.menu_model.create(menus)
        return ('menu is created')
    }
    async getmenus(read:menuDto){
        let menus = await this.menu_model.find({});
        return {data:menus}
    }
    async Deletemenus(Delete:menuDto){
        let menus = new menu()//檢
        menus.menu_name = Delete.menu_name;
        menus.menu_type = Delete.menu_type;
        menus.menu_price = Delete.menu_price;
        menus.menu_rating = Delete.menu_rating;
       
        await this.menu_model.create(menus)
        return ('menu is deleted')
    }
}