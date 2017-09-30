
import { get, post } from './util';
import { PublicUser } from '../api/dto/User';
import { PublicCloud, Cloud } from '../api/dto/Cloud';

const invitationPath = 'invitations';

export interface IFetchInvitationResponse {
    user: PublicUser,
    cloud: PublicCloud,
}
export async function fetchInvitationRequest(key: string): Promise<IFetchInvitationResponse> {
    const response: IFetchInvitationResponse = await get(`${invitationPath}?key=${key}`);
    return response;
}

export interface IJoinByKeyResponse {
    cloud: Cloud
}
export async function joinByKeyRequest(key: string): Promise<IJoinByKeyResponse> {
    const body = {
        key: key
    }
    const response: IJoinByKeyResponse = await post(invitationPath, body);
    return response;
}
