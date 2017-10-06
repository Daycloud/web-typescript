import { IPublicUserDTO } from './UserDTO';
import { IPublicCloudDTO } from './CloudDTO';

export interface IInvitationDTO {
    user: IPublicUserDTO;
    cloud: IPublicCloudDTO;
}