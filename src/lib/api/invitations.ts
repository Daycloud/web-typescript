
import { get, post, addAuthenticationHeader, IResponse } from './util';
import { ICloudDTO, IPublicCloudDTO } from './dto/CloudDTO';
import tokenManager from './TokenManager';
import { IPublicUserDTO } from './dto/UserDTO';

const invitationPath = 'invitations';
const joinPath = 'clouds/joinbykey';

export interface IFetchInvitationResponse {
    cloud: IPublicCloudDTO;
    inviter: IPublicUserDTO;
}
export async function fetchInvitationRequest(key: string): Promise<IResponse<IFetchInvitationResponse>> {
    return await get<IFetchInvitationResponse>(`${invitationPath}?key=${key}`);
}

export interface IJoinByKeyResponse {
    cloud: ICloudDTO;
}
export async function joinByKeyRequest(key: string): Promise<IResponse<IJoinByKeyResponse>> {
    const body = {
        key: key
    };
    return await post<IJoinByKeyResponse>(
        joinPath,
        body,
        addAuthenticationHeader({}, tokenManager.accessToken!)
    );
}
