
export interface TokensDAO {
    access_token: string;
    refresh_token: string;
}

export interface AccessTokenData {
    userId: string;
    iat: number;
    exp: number;
}
export interface RefreshTokenData {
    userId: string;
    type: string;
    logoutVersion: number;
    iat: number;
    exp: number;
}