import { Controller } from "../../lib/bind";
import { Request, Response } from "express";
import { Delete, Get, Post } from "../../lib/methods";
import {
  LoginDto,
  RegisterDto,
  register_schema,
  login_schema,
} from "./auth.dto";
import { AuthService } from "./authservice";
import { LoginGuard, LoginStaff } from "../../guards/role.guard";
import { InvalidInputError } from "../../middleware/error.middleware";

@Controller("/auth")
export class AuthController {
  constructor(private service = new AuthService()) {}

  @Post("/register")
  async register(req: Request) {
    let body: RegisterDto = register_schema.validateSync(req.body);
    let message = this.service.register(body);
    return message;
  }

 

  @Post("/login")
  login(req: Request, res: Response) {
    let body: LoginDto = login_schema.validateSync(req.body);
    let message = this.service.login(body, res);
    return message;
  }

  @Get("/logout")
  logout(req: Request, res: Response) {
    res.clearCookie("userid");
    res.clearCookie("userName");
    res.clearCookie("token");
    
    return res;
  }

  @Get("/authorized")
  @LoginGuard()
  async authorizd(req: Request) {
    return { message: "Hi there" };
  }

  @Post("/login-admin")
  login_admin(req: Request, res: Response) {
    let body: LoginDto = req.body;
    let message = this.service.login_staff(body, res);
    return message;
  }
  @Post("/login-ngo")
  login_ngo(req: Request, res: Response) {
    let body: LoginDto = req.body;
    let message = this.service.login(body, res);
    return message;
  }
 
}
