import { IStoreState } from './../../lib/redux/RequestDuck';
import { Dispatch } from 'redux';

import { IAppState } from '../index';
import { IResponse, isSuccessResponse } from './../../lib/api/util/index';

import RequestDuck from '../../lib/redux/RequestDuck';
import { ICloudDTO } from '../../lib/api/dto/CloudDTO';
import { fetchClouds, IFetchCloudsResponse } from '../../lib/api/clouds';

interface ICloudsModel {
    clouds?: ICloudDTO[];
}

export interface ICloudsState extends IStoreState<ICloudsModel> {}

const cloudsDuck = new RequestDuck<ICloudsModel>('Clouds', {
    clouds: undefined
});
export const CloudsReducer = cloudsDuck.reducer;

export function doFetchClouds(dispatch: Dispatch<IAppState>) {
    return async () => {
        dispatch(cloudsDuck.createSetLoadingAction());
        let response: IResponse<IFetchCloudsResponse> = await fetchClouds();

        if (isSuccessResponse(response.status)) {
            dispatch(cloudsDuck.createSetModelAction({ clouds: response.data!.clouds }));
        } else {
            dispatch(cloudsDuck.createSetErrorAction(response.status));
        }
    };
}
