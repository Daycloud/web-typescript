
import { IPublicUserDTO } from './UserDTO';
import { ICloudImageDTO } from './CloudImageDTO';
import { ISettingsDTO } from './SettingdsDTO';

export interface IPublicCloudDTO {
    name: string;
    _id: string;
}
export interface ICloudDTO extends IPublicCloudDTO {
    owner: IPublicUserDTO;
    administrators: string[];
    members: IPublicUserDTO;
    cloudImages: ICloudImageDTO[];
    settings: ISettingsDTO;
}