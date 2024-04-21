import * as yup from "yup"

export interface RegisterDto{
    first_name?:string,
    last_name?:string,
    number?:string,
    email?:string,
    address?:string,
    password?:string,
    confirmPassword?:string,
    role?:string
}
export interface LoginDto{
    email?: string;
    password?: string;
}

export const login_schema=yup.object().shape({
    email:yup.string().required(),
    password:yup.string().required()
})

export const register_schema=yup.object().shape({
    email:yup.string().required(),
    password:yup.string().required(),
    confirmPassword:yup.string().required(),
    number:yup.string(),
    address:yup.string().required(),
    first_name:yup.string().required(),
    last_name:yup.string().required()

})