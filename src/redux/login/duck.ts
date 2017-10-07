import { IStoreState } from './../../lib/redux/RequestDuck';
import { Dispatch } from 'redux';

import {
    ILoginResponseBody,
    localLoginRequest,
    IFacebookLoginResponseBody,
    facebookLoginRequest,
    refreshTokenRequest,
    IRefreshTokenResponseBody
} from '../../lib/api/login';
import tokenManager from '../../lib/api/TokenManager';
import { setModelActionBuilder as setUserModelActonBuilder } from '../user/duck';
import { IAppState } from '../index';
import { IResponse, isSuccessResponse } from './../../lib/api/util/index';

import RequestDuck from '../../lib/redux/RequestDuck';

interface ILoginModel {
    isLoggedIn: boolean;
    redirectUrl?: string;
}
export interface ILoginState extends IStoreState<ILoginModel> {
}
const loginDuck = new RequestDuck<ILoginModel>('Login', {
    isLoggedIn: false,
    redirectUrl: undefined
});
export const LoginReducer = loginDuck.reducer;

export function doRefreshTokens(dispatch: Dispatch<IAppState>) {
    return async (refreshToken: string) => {
        dispatch(loginDuck.createSetLoadingAction());
        let response: IResponse<IRefreshTokenResponseBody> = await refreshTokenRequest(refreshToken);

        if (isSuccessResponse(response.status)) {
            tokenManager.saveTokens(response.data!.tokens);
            dispatch(setUserModelActonBuilder(response.data!.user));
            dispatch(loginDuck.createSetModelAction({ isLoggedIn: true }));
        } else {
            dispatch(loginDuck.createSetErrorAction(response.status));
        }
    };
}
export function doLogin(dispatch: Dispatch<IAppState>) {
    return async (username: string, password: string) => {
        dispatch(loginDuck.createSetLoadingAction());
        let response: IResponse<ILoginResponseBody> = await localLoginRequest(username, password);

        if (isSuccessResponse(response.status)) {
            tokenManager.saveTokens(response.data!.tokens);
            dispatch(setUserModelActonBuilder(response.data!.user));
            dispatch(loginDuck.createSetModelAction({ isLoggedIn: true }));
        } else {
            dispatch(loginDuck.createSetErrorAction(response.status));
        }
    };
}
export function doFacebookLogin(dispatch: Dispatch<IAppState>) {
    return async (fbToken: string) => {
        dispatch(loginDuck.createSetLoadingAction());
        let response: IResponse<IFacebookLoginResponseBody> = await facebookLoginRequest(fbToken);

        if (isSuccessResponse(response.status)) {
            tokenManager.saveTokens(response.data!.tokens);
            dispatch(setUserModelActonBuilder(response.data!.user));
            dispatch(loginDuck.createSetModelAction({ isLoggedIn: true }));
        } else {
            dispatch(loginDuck.createSetErrorAction(response.status));
        }
    };
}
export function doLogout(dispatch: Dispatch<IAppState>) {
    return async () => {
        tokenManager.clearTokens();
        dispatch(loginDuck.createSetModelAction({ isLoggedIn: false }));
    };
}
export function doSetPostLoginRedirectLink(dispatch: Dispatch<IAppState>) {
    return (url: string) => {
        dispatch(loginDuck.createSetModelAction(
            { isLoggedIn: loginDuck.lastState.model.isLoggedIn, redirectUrl: url }
        ));
    };
}
