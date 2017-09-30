
import { post } from './util';
import { UserDAO } from './dto/UserDAO';
import { TokensDAO } from './dto/TokenDAO';

const facebookLoginPath = 'facebooklogin';
const localLoginPath = 'login';

export interface IFacebookLoginResponseBody {
    user: UserDAO;
    tokens: TokensDAO
}
export async function facebookLoginRequest(fbToken: string): Promise<IFacebookLoginResponseBody> {
    const body = {
        fbToken: fbToken,
    };
    const response: IFacebookLoginResponseBody = await post(facebookLoginPath, body);
    return response;
}

export interface ILoginResponseBody {
    user: UserDAO
    tokens: TokensDAO
}
export async function localLoginRequest(username: string, password: string): Promise<ILoginResponseBody> {
    const body = {
        username: username,
        password: password,
    };
    const response: ILoginResponseBody = await post(localLoginPath, body);
    return response;
}