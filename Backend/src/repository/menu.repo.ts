import { AppDataStore } from "../data-source";
import { menu } from '../entity/menu.entity';


export const menuRepo=AppDataStore.getRepository(menu)