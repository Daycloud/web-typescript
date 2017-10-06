export interface IPublicUserDTO {
    displayName: string;
    fbId?: string;
    _id: string;
}
export interface IUserDTO extends IPublicUserDTO {
}