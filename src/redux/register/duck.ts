import { IStoreState } from '../../lib/redux/RequestDuck';
import { Dispatch } from 'redux';

import { IAppState } from '../index';
import { IResponse, isSuccessResponse } from '../../lib/api/util/index';

import RequestDuck from '../../lib/redux/RequestDuck';
import { ILoginResponseBody, registerRequest } from '../../lib/api/login';
import { doLogin } from '../login/duck';

interface IRegisterModel {}

export interface IRegisterState extends IStoreState<IRegisterModel> {}

const registerDuck = new RequestDuck<IRegisterModel>('Register', {});
export const RegisterReducer = registerDuck.reducer;

export function doRegister(dispatch: Dispatch<IAppState>) {
    return async (email: string,
                  password: string,
                  displayName: string) => {
        dispatch(registerDuck.createSetLoadingAction());
        let response: IResponse<ILoginResponseBody> = await registerRequest(email, password, displayName);

        if (isSuccessResponse(response.status)) {
            dispatch(registerDuck.createSetModelAction({})); // don't actually store state, but stop loading etc.
            doLogin(dispatch)(email, password);
        } else {
            dispatch(registerDuck.createSetErrorAction(response.status));
        }
    };
}
