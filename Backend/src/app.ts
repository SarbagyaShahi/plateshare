import express from "express"
import { BspApplication } from "./lib/application.lib"
import { ApplicationStartError, CustomError } from "./middleware/error.middleware"
import { DataSource } from "typeorm"
import { AppDataStore } from "./data-source"
import * as dotenv from "dotenv"
import { AuthController } from "./routes/auth/auth.controller"
import { OrderController } from "./routes/Order/Order.controller"
import { PostController } from "./routes/post/post.controller"
import { MenuController } from "./routes/menu/Menu.controller"
import { DonateController } from "./routes/Donate/Donate.controller"
import { articleController } from './routes/Article/article.controller';
import { EventController } from './routes/Event/Event.controller';

dotenv.config()
const bspApplication=new BspApplication(express(),[ 
    new AuthController(),
    new OrderController(),
    new PostController(),
    new MenuController(),
    new DonateController(),
    new articleController(),
    new EventController()
    
])
const app=bspApplication.getApplication()
app.use("/public",express.static("./public"))
app.use(CustomError.sendResponse)

function applicationStart(AppDataSource: DataSource) {
    return new Promise((resolve, reject) => {
        AppDataSource.initialize().then((conn) => {
            bspApplication.startApplication(process.env.DEV_PORT)
            console.log("Connected to database")

        }).catch((e) => {
            reject(new ApplicationStartError(e.message))
        })
    })
}

applicationStart(AppDataStore)