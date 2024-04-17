import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { string } from "yup";
import { menu } from "./menu.entity"
import { order } from "./order.entity";

export class GlobalEntity {

    @PrimaryGeneratedColumn()
    Id: string


}
import { randomBytes } from 'crypto';

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    const bytes = randomBytes(length);
    for (let i = 0; i < bytes.length; i++) {
        result += characters.charAt(bytes[i] % charactersLength);
    }
    return result;
}

// Usage example
const randomString = generateRandomString(10); // Generates a random string of length 10
console.log(randomString);




