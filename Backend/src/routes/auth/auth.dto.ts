export interface RegisterDto{
    first_name?:string,
    last_name?:string,
    number?:string,
    email?:string,
    address?:string,
    password?:string,
    confirmPassword?:string,
}
export interface LoginDto{
    email?: string;
    password?: string;
}
