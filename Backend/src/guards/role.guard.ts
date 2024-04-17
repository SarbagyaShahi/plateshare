import { AuthorizedRequest } from "../typings/base.type";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../middleware/error.middleware";
import { global_login_store } from "../store/store.global";

export function LoginGuard() {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        let original: Function = descriptor.value;
        descriptor.value = async function (...args: [AuthorizedRequest, Response, NextFunction]) {
            let token: string | null;
            token = args[0].cookies
                ? args[0].cookies["token"]
                : null;
            if (token == null) throw new CustomError("No token found", 403);
            let _token = global_login_store.verify_login_token(token)
            args[0].user = _token
            args[0].token = token
            if (!_token) {
                args[1].clearCookie("token")
                return args[1].json({ message: "Session expired" })
            }
            // Await the function call so that the call function can gets handled
            return await original.apply(this, args);
        };
        return descriptor
    }
}

export function LoginStaff() {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        let original: Function = descriptor.value;
        descriptor.value = async function (...args: [AuthorizedRequest, Response, NextFunction]) {
            let token: string | null;
            token = args[0].cookies
                ? args[0].cookies["token"]
                : null;
            if (token == null) throw new CustomError("No token found", 403);
            let _token = global_login_store.verify_staff_token(token)
            args[0].user = _token
            args[0].token = token
            if (!_token) {
                args[1].clearCookie("token")
                return args[1].json({ message: "Session expired" })
            }
            // Await the function call so that the call function can gets handled
            return await original.apply(this, args);
        };
        return descriptor
    }
}