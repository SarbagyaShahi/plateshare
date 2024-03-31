import { User } from '../../entity/user.entity';
import { CustomError, InvalidInputError, UserNotExist } from "../../middleware/error.middleware";
import { UserModel } from "../../model/user.model";
import { hashPassword, verifyHash } from "../../utils/base.util";
import { RegisterDto } from "./auth.dto";
import { Response } from 'express';
import { LoginDto } from "./auth.dto";
import { Role } from '../../typings/base.type';
import { global_settings } from '../../bootstrap/config';
import { generateToken } from '../../utils/base.util';
import { global_login_store } from '../../store/store.global';
import { setCookie } from '../../utils/cookie.util';

export class AuthService {
    constructor(
        private user_model = new UserModel()
    ) { }

    async register(data: RegisterDto) {
        console.log(data)
        let existingUser = await this.user_model.findOne({ where: { User_email: data.email } })
        if (existingUser)
            throw new InvalidInputError("Email already registered")
        if (data.password !== data.confirmPassword)
            throw new InvalidInputError("Password do not match")
        let user = new User()
        user.User_Phone = data.number
        user.User_address = data.address
        user.User_email = data.email
        user.User_name = data.first_name + " " + data.last_name
        let hashPass = hashPassword(data.password)
        user.User_password = hashPass
        await this.user_model.create(user)
        return { message: "User created" }
    }
    async login(body: LoginDto, res: Response) {
        console.log(body)
        let User = await this.user_model.findOne({ where: { User_email: body.email } })
        if (!User)
            throw new UserNotExist("User doesn't exist")
        if (!verifyHash(body.password, User.User_password))
            throw new CustomError("Password don't match try again", 400)
        //set token in cookie
        let token: string
        if (User.role == Role.USER)
            token = generateToken(global_settings.secrets.authentication_user, { userId: User.Userid, role: User.role })
        global_login_store.set_login_token(token, User.Userid)
        if (User.role == Role.USER)
            setCookie(res, "token", token, {})
        return { statusCode: 200, message: "Login in successful" }
    }

   
}


