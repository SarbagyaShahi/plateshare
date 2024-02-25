import * as crypto from "crypto"
import { Token } from "../typings/base.type";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";


export function capitalize(string:string){
    if(!string) return undefined
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()   
}


//random number generator
export function generateRandomString(length:number = 100){
    let grs = crypto.randomBytes(length).toString('hex');
    return grs
}

//token generator
export function generateToken(secrects:string,userObj:Token){
    let accessToken = jwt.sign(userObj,secrects);
    return accessToken
}

//token verify
export function tokenVerify(secrects: string, token: string){
    let verifyToken = jwt.verify(token,secrects);
    return verifyToken

}


export function hashPassword(password:string){
    let hashedPass = bcrypt.hashSync(password, 10);
    return hashedPass
}

export function verifyHash(password:string, hash:string){
    return bcrypt.compareSync(password, hash)
}


export function generateId(length=10){
    var result= '';
    var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function filterbody(body:string){
    let scriptPattern: RegExp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/
    body = body.replace(scriptPattern, "")
    return body
}


export function calculateAverageNormalizedRating(ratings: number[]): number {
    // Normalize the ratings by dividing each rating by 5.
    const normalizedRatings: number[] = ratings.map(rating => rating / 5);
  
    if (normalizedRatings.length === 0) {
      return 0; // Return 0 if there are no ratings to avoid dividing by zero.
    }
  
    const sum: number = normalizedRatings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average: number = (sum / normalizedRatings.length) * 5; // Scale the average back to the 0-5 range.
    return average;
  }