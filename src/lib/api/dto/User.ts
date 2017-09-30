export interface PublicUser {
    displayName: string,
    fbId?: string,
    _id: string,
}
export interface User extends PublicUser {
}