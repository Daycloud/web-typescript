
import { get, post, addAuthenticationHeader, IResponse } from './util';
import { ICloudDTO } from './dto/CloudDTO';
import tokenManager from './TokenManager';
import { IInvitationDTO } from './dto/InvitationDTO';

const invitationPath = 'invitations';

export interface IFetchInvitationResponse {
    invitation: IInvitationDTO;
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
        invitationPath,
        body,
        addAuthenticationHeader({}, tokenManager.refreshToken!)
    );
}
