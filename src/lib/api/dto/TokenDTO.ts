
export interface ITokensDTO {
    access_token: string;
    refresh_token: string;
}

export interface IAccessTokenData {
    userId: string;
    iat: number;
    exp: number;
}
export interface IRefreshTokenData {
    userId: string;
    type: string;
    logoutVersion: number;
    iat: number;
    exp: number;
}