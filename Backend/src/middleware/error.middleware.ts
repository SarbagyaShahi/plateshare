import { NextFunction, Request, Response } from "express"

export class CustomError {
    statusCode: number
    message: string | null

    constructor(message: string, statusCode: number) {
        this.statusCode = statusCode
        this.message = message
    }

    public static sendResponse(error: CustomError, req: Request, res: Response, next: NextFunction) {
        res.statusCode = (error.statusCode) ? error.statusCode : res.statusCode
        return res.json({ message: error.message })
    }
}

export class UnknownError extends CustomError{
    constructor(message:string="Unknown error occured"){
        super(message,500)
    }
}

export class ResponseError extends CustomError{
    constructor(message:string,statusCode:number){
        super(message,statusCode)
    }
}

export class InvalidInputError extends CustomError{
    constructor(message:string="Invalid input") {
        super(message,400)
    }
}

export class PermissionNotGranted extends CustomError{
    constructor(messag:string="Permission not granted") {
        super(messag,403)
    }
}


export class UserNotExist extends CustomError{
    constructor(messag:string="User not registered") {
        super(messag,401)
    }
}

export class ApplicationStartError extends Error {
    constructor(error:string) {
        super(error)
    }
}

export class FileSizeExceed extends Error {
    constructor(error:string) {
        super(error)
    }
}

export class FileMimeError extends Error{
    constructor(error:string){
        super(error)
    }
}