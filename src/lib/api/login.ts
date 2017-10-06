import { post, get, addAuthenticationHeader, IResponse } from './util';
import { IUserDTO } from './dto/UserDTO';
import { ITokensDTO } from './dto/TokenDTO';

const facebookLoginPath = 'facebooklogin';
const localLoginPath = 'login';
const refreshTokenPath = 'login/refresh';

export interface IFacebookLoginResponseBody {
    user: IUserDTO;
    tokens: ITokensDTO;
}
export async function facebookLoginRequest(fbToken: string): Promise<IResponse<IFacebookLoginResponseBody>> {
    const body = {
        fbToken: fbToken,
    };
    return await post<IFacebookLoginResponseBody>(facebookLoginPath, body);
}

export interface ILoginResponseBody {
    user: IUserDTO;
    tokens: ITokensDTO;
}
export async function localLoginRequest(username: string, password: string): Promise<IResponse<ILoginResponseBody>> {
    const body = {
        email: username,
        password: password,
    };
    return await post<ILoginResponseBody>(localLoginPath, body);
}

export interface IRefreshTokenResponseBody {
    user: IUserDTO;
    tokens: ITokensDTO;
}
export async function refreshTokenRequest(refreshToken: string): Promise<IResponse<IRefreshTokenResponseBody>> {
    return await get<ILoginResponseBody>(refreshTokenPath, addAuthenticationHeader({}, refreshToken));
}