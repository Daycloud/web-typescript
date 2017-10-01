import { post, get, addAuthenticationHeader, IResponse } from './util';
import { UserDAO } from './dto/UserDAO';
import { TokensDAO } from './dto/TokenDAO';

const facebookLoginPath = 'facebooklogin';
const localLoginPath = 'login';
const refreshTokenPath = 'login/refresh';

export interface IFacebookLoginResponseBody {
    user: UserDAO;
    tokens: TokensDAO;
}
export async function facebookLoginRequest(fbToken: string): Promise<IResponse<IFacebookLoginResponseBody>> {
    const body = {
        fbToken: fbToken,
    };
    return await post<IFacebookLoginResponseBody>(facebookLoginPath, body);
}

export interface ILoginResponseBody {
    user: UserDAO;
    tokens: TokensDAO;
}
export async function localLoginRequest(username: string, password: string): Promise<IResponse<ILoginResponseBody>> {
    const body = {
        username: username,
        password: password,
    };
    return await post<ILoginResponseBody>(localLoginPath, body);
}

export interface IRefreshTokenResponseBody {
    user: UserDAO;
    tokens: TokensDAO;
}
export async function refreshTokenRequest(refreshToken: string): Promise<IResponse<IRefreshTokenResponseBody>> {
    return await get<ILoginResponseBody>(refreshTokenPath, addAuthenticationHeader({}, refreshToken));
}