import { Response } from "express";
import { CustomError } from "../middleware/error.middleware";

export interface ResponseBody {
    [key: string]: any

}

export class ResponseHandlerError extends CustomError {
    constructor(message: string, statusCode: number) {
        super(message, statusCode)
    }
}

export function responseHandler(res: Response, data?: ResponseBody | string) {
    try {
        res.send(data)
    }
    catch (e) {
        throw new ResponseHandlerError("Error sending response", 500)
    }
}