import { CustomError, UnknownError } from "../middleware/error.middleware"
import { stringify } from "querystring"
import axios from "axios"

class OAuthError extends CustomError {
    constructor(message: string, statusCode: number) {
        super(message, statusCode)
    }
}

export interface StrategyOption {
    request_url: string,
    access_token_url: string,
    user_info_url: string,
    redirect_uri: string,
    client_id: string,
    access_type: "offline" | "online",
    response_type: "code" | "token",
    client_secret: string
    prompt: "consent",
    scope: string[],
    [key: string]: string | string[]
}

export interface OAuthProfile {
    id: string,
    email: string,
    given_name: string
    family_name: string
    picture: string
}

interface RequestToken {
    code: string,
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    grant_type: "authorization_code"
}

interface ResponeToken {
    access_token: string
    id_token: string
    scopes: string

}

export class Strategy {

    oAuthStrategy = (strategy: StrategyOption | null) => {
        if (!strategy) throw new OAuthError("Strategy field empty", 403)
        let { request_url, scope, client_secret, ...options } = strategy
        let queryString = stringify({ scope: scope.join(" "), ...options, })
        return {
            redirect_url: `${request_url}?${queryString}`
        }
    }

    getAccessToken = async (url: string, options: RequestToken): Promise<ResponeToken> => {
        const res = await axios.post<ResponeToken>(url,
            {
                headers: {
                    "Content-Type": "appliation/x-www-form-urlencoded"
                },
                ...options
            })
        return res.data
    }

    getProfile = async ({ url, access_token, id_token }: { url: string, access_token: string, id_token: string }): Promise<{profile:OAuthProfile,host:string}> => {
        const res = await axios.get<OAuthProfile>(`${url}?alt=json&access_token=${access_token}`,
            {
                headers: {
                    "Content-Type": "appliation/x-www-form-urlencoded",
                    "Authorization": `Bearer ${id_token}`
                }
            })
        if(res.status >=400 ) throw new UnknownError()
        return {profile:res.data,host:res.request.host}
    }

    _callBackHandler = async (strategy: StrategyOption | null, code: string): Promise<{profile:OAuthProfile,host:string}> => {
        if (!strategy) throw new OAuthError("Strategy field empty", 403)
        let { access_token, id_token } = await this.getAccessToken(
            strategy.access_token_url,
            {
                client_id: strategy.client_id,
                client_secret: strategy.client_secret,
                code,
                grant_type: "authorization_code",
                redirect_uri: strategy.redirect_uri
            })
        return await this.getProfile({ url: strategy.user_info_url, access_token, id_token })
    }
}