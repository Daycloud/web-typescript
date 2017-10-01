const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'LOCAL_STORAGE_ACCESS_TOKEN_KEY';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'LOCAL_STORAGE_REFRESH_TOKEN_KEY';

import { TokensDAO, AccessTokenData, RefreshTokenData } from './dto/TokenDAO';

function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function decodeAccessToken(token: string): AccessTokenData {
    return parseJwt(token);
}
function decodeRefreshToken(token: string): RefreshTokenData {
    return parseJwt(token);
}

class TokenManager {
    accessToken?: string;
    refreshToken?: string;

    constructor() {
        this.accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || undefined;
        this.refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY) || undefined;
    }
    saveTokens(tokens: TokensDAO) {
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
        const decoded: AccessTokenData = decodeAccessToken(this.accessToken!);
        const isExpired = (decoded.exp > new Date().getTime());
        return isExpired;
    }
    isRefreshTokenExpired(): boolean {
        const decoded: RefreshTokenData = decodeRefreshToken(this.accessToken!);
        const isExpired = (decoded.exp > new Date().getTime());
        return isExpired;
    }
}
const tokenManager = new TokenManager();
export default tokenManager;