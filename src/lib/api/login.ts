
import { post, get, addAuthenticationHeader } from './util';
import { UserDAO } from './dto/UserDAO';
import { TokensDAO } from './dto/TokenDAO';

const facebookLoginPath = 'facebooklogin';
const localLoginPath = 'login';
const refreshTokenPath = 'login/refresh';

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

export interface IRefreshTokenResponseBody {
    user: UserDAO;
    tokens: TokensDAO;
}
export async function refreshTokenRequest(refreshToken: string): Promise<IRefreshTokenResponseBody> {
    const response: IRefreshTokenResponseBody = await get(refreshTokenPath, addAuthenticationHeader({}, refreshToken));
    return response;
}