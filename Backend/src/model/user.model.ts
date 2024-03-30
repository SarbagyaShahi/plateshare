import { User } from "../entity/user.entity";
import { userRepo } from "../repository/user.repo";
import { GlobalModel } from "./global.model";

export class UserModel extends GlobalModel<User>{
    constructor(){
        super(userRepo);
    }
}