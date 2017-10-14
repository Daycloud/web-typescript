import { IStoreState } from './../../lib/redux/RequestDuck';
import { Dispatch } from 'redux';

import { IAppState } from '../index';
import { IResponse, isSuccessResponse } from './../../lib/api/util/index';

import RequestDuck from '../../lib/redux/RequestDuck';
import { IJoinByKeyResponse, joinByKeyRequest } from '../../lib/api/invitations';

interface IJoinByKeyModel {
    hasJoined: boolean;
}

export interface IJoinByKeyState extends IStoreState<IJoinByKeyModel> {}

const joinByKeyDuck = new RequestDuck<IJoinByKeyModel>('JoinByKey', {
    hasJoined: false
});
export const JoinByKeyReducer = joinByKeyDuck.reducer;

export function doJoinByKey(dispatch: Dispatch<IAppState>) {
    return async (key: string) => {
        dispatch(joinByKeyDuck.createSetLoadingAction());
        let response: IResponse<IJoinByKeyResponse> = await joinByKeyRequest(key);

        if (isSuccessResponse(response.status)) {
            dispatch(joinByKeyDuck.createSetModelAction({ hasJoined: true }));
        } else {
            dispatch(joinByKeyDuck.createSetErrorAction(response.status));
        }
    };
}
