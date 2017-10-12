
import { addAuthenticationHeader, get, IResponse } from './util';
import { ICloudDTO } from './dto/CloudDTO';
import tokenManager from './TokenManager';

const cloudsPath = 'me/clouds';

export interface IFetchCloudsResponse {
    clouds: ICloudDTO[];
}
export async function fetchClouds(): Promise<IResponse<IFetchCloudsResponse>> {
    return await get<IFetchCloudsResponse>(
        `${cloudsPath}`, addAuthenticationHeader({}, tokenManager.accessToken!)
    );
}
