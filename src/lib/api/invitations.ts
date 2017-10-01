
import { get, post, addAuthenticationHeader } from './util';
import { PublicUserDAO } from './dto/UserDAO';
import { PublicCloudDAO, CloudDAO } from './dto/CloudDAO';
import tokenManager from './TokenManager';

const invitationPath = 'invitations';

export interface IFetchInvitationResponse {
    user: PublicUserDAO;
    cloud: PublicCloudDAO;
}
export async function fetchInvitationRequest(key: string): Promise<IFetchInvitationResponse> {
    return await get<IFetchInvitationResponse>(`${invitationPath}?key=${key}`);
}

export interface IJoinByKeyResponse {
    cloud: CloudDAO;
}
export async function joinByKeyRequest(key: string): Promise<IJoinByKeyResponse> {
    const body = {
        key: key
    };
    return await post<IJoinByKeyResponse>(
        invitationPath,
        body,
        addAuthenticationHeader({}, tokenManager.refreshToken!)
    );
}
