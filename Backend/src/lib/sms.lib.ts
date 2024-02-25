import * as querystring from 'querystring';
import * as https from "https"
import { Singleton } from './singleton';

class MessageSendError extends Error {
    constructor(message: string) {
        super();
        this.message = message
    }
}

interface MessageInterface {
    apiKey: string
    url: string
}

export interface MessageOption {
    senderId?: string
    username?: string
    msg:string
    type: string
    campaign: number
    password?: string
    routeId: number
    [key: string]: string | number | string[]
}

@Singleton()
export class MessageHandler implements MessageInterface {
    apiKey: string
    url: string
    protocol: string

    constructor(apiKey: string, url: string) {
        this.apiKey = apiKey
        this.url = url
        this.protocol = new URL(this.url).toString()
    }

    sendMessage(options: MessageOption,contacts:string[]): Promise<boolean> {
        const queryString = querystring.stringify(options)
        return new Promise<boolean>((resolve, reject) => {
            https.get(`${this.url}?${queryString}&key=${this.apiKey}&contacts=${contacts.join(", ")}`
                , res => {
                    res.on("data", (e) => {
                        let res: string = String(e)
                        if (res.match(/ERR: /)) reject(new MessageSendError(e.message))
                        resolve(true)
                    })
                    res.on('error', (e) => {
                        reject(new MessageSendError(e.message))
                    })
                    res.on('end', () => {

                    })
                });
        })
    }

}
