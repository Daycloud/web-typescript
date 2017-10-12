import { IPublicUserDTO } from './UserDTO';

export interface ICloudImageDTO {
    owner: IPublicUserDTO;
    _id: string;
}