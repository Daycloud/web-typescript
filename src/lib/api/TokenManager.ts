const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'LOCAL_STORAGE_ACCESS_TOKEN_KEY';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'LOCAL_STORAGE_REFRESH_TOKEN_KEY';

import { ITokensDTO, IAccessTokenData, IRefreshTokenData } from './dto/TokenDTO';

function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function decodeAccessToken(token: string): IAccessTokenData {
    return parseJwt(token);
}
function decodeRefreshToken(token: string): IRefreshTokenData {
    return parseJwt(token);
}

class TokenManager {
    accessToken?: string;
    refreshToken?: string;

    constructor() {
        this.accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || undefined;
        this.refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY) || undefined;
    }
    saveTokens(tokens: ITokensDTO) {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.access_token);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refresh_token);
        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token;
    }
    clearTokens() {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    }
    isAccessTokenExpired(): boolean {
        const decoded: IAccessTokenData = decodeAccessToken(this.accessToken!);
        const isExpired = (decoded.exp > new Date().getTime());
        return isExpired;
    }
    isRefreshTokenExpired(): boolean {
        const decoded: IRefreshTokenData = decodeRefreshToken(this.accessToken!);
        const isExpired = (decoded.exp > new Date().getTime());
        return isExpired;
    }
}
const tokenManager = new TokenManager();
export default tokenManager;