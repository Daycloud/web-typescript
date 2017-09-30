
import { get, post } from './util';
import { PublicUserDAO } from '../api/dto/UserDAO';
import { PublicCloudDAO, CloudDAO } from '../api/dto/CloudDAO';

const invitationPath = 'invitations';

export interface IFetchInvitationResponse {
    user: PublicUserDAO,
    cloud: PublicCloudDAO,
}
export async function fetchInvitationRequest(key: string): Promise<IFetchInvitationResponse> {
    const response: IFetchInvitationResponse = await get(`${invitationPath}?key=${key}`);
    return response;
}

export interface IJoinByKeyResponse {
    cloud: CloudDAO
}
export async function joinByKeyRequest(key: string): Promise<IJoinByKeyResponse> {
    const body = {
        key: key
    }
    const response: IJoinByKeyResponse = await post(invitationPath, body);
    return response;
}
