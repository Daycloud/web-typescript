import { post, get, addAuthenticationHeader, IResponse } from './util';
import { IUserDTO } from './dto/UserDTO';
import { ITokensDTO } from './dto/TokenDTO';
import tokenManager from './TokenManager';

const facebookLoginPath = 'facebooklogin';
const localLoginPath = 'login';
const refreshTokenPath = 'login/refresh';
const registerPath = 'users';

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

export async function registerRequest(email: string,
                                      password: string,
                                      displayName: string): Promise<IResponse<ILoginResponseBody>> {
    const body = {
        email: email,
        password: password,
        displayName: displayName
    };
    return await post<ILoginResponseBody>(
        registerPath,
        body,
        addAuthenticationHeader({}, tokenManager.accessToken!)
    );
}