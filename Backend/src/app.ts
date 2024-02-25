import express from "express"
import { BspApplication } from "./lib/application.lib"
import { ApplicationStartError, CustomError } from "./middleware/error.middleware"
import { DataSource } from "typeorm"
import { AppDataStore } from "./data-source"
import * as dotenv from "dotenv"
import { UserController } from "./routes/user/user.controller"
import { AuthController } from "./routes/auth/auth.controller"

dotenv.config()
const bspApplication=new BspApplication(express(),[ 
    new UserController(),
    new AuthController() 
])
const app=bspApplication.getApplication()
app.use("/public",express.static("./public"))
app.use(CustomError.sendResponse)

function applicationStart(AppDataSource: DataSource) {
    return new Promise((resolve, reject) => {
        AppDataSource.initialize().then((conn) => {
            console.log("Connected to database")
            bspApplication.startApplication(process.env.DEV_PORT)
        }).catch((e) => {
            reject(new ApplicationStartError(e.message))
        })
    })
}

applicationStart(AppDataStore)