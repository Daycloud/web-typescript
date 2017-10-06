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

enum TypeKeys {
    LOADING = 'LOGIN_ACTION_LOADING',
    SET_REDIRECT_URL = 'LOGIN_ACTION_SET_REDIRECT_URL',
    LOGGED_IN = 'LOGIN_ACTION_LOGIN_FINISHED',
    ERROR = 'LOGIN_ACTION_ERROR',
    DEFAULT = '__DEFAULT_ACTION__'
}

interface ILoadingAction {
    type: TypeKeys.LOADING;
}
interface IRedirectAction {
    type: TypeKeys.SET_REDIRECT_URL;
    url: string;
}
interface ILoggedInAction {
    type: TypeKeys.LOGGED_IN;
}
interface IErrorAction {
    type: TypeKeys.ERROR;
    error: number;
}
type ActionTypes =
    | ILoadingAction
    | IRedirectAction
    | ILoggedInAction
    | IErrorAction;

function setLoadingActionBuilder(): ILoadingAction {
    return { type: TypeKeys.LOADING };
}
function setLoggedInActionBuilder(): ILoggedInAction {
    return { type: TypeKeys.LOGGED_IN };
}
function setRedirectActionBuilder(url: string): IRedirectAction {
    return { type: TypeKeys.SET_REDIRECT_URL, url: url };
}
function setErrorActionBuilder(error: number): IErrorAction {
    return { type: TypeKeys.ERROR, error: error };
}

export interface ILoginState {
    loading: boolean;
    isLoggedIn: boolean;
    redirectUrl?: string;
    error?: number;
}
const initialState: ILoginState = {
    loading: false,
    isLoggedIn: false,
    redirectUrl: undefined,
};
export function LoginReducer(state: ILoginState = initialState, action: ActionTypes): ILoginState {
    switch (action.type) {
        case TypeKeys.LOADING:
            return { ...state, loading: true };
        case TypeKeys.LOGGED_IN:
            return { ...state, loading: false, isLoggedIn: true };
        case TypeKeys.SET_REDIRECT_URL:
            return { ...state, redirectUrl: action.url };
        case TypeKeys.ERROR:
            return { ...state, loading: false, isLoggedIn: false, error: action.error};
        default:
            return state;
    }
}

export function doRefreshTokens(dispatch: Dispatch<IAppState>) {
    return async (refreshToken: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IResponse<IRefreshTokenResponseBody> = await refreshTokenRequest(refreshToken);

        if (isSuccessResponse(response.status)) {
            tokenManager.saveTokens(response.data!.tokens);
            dispatch(setUserModelActonBuilder(response.data!.user));
            dispatch(setLoggedInActionBuilder());
        } else {
            dispatch(setErrorActionBuilder(response.status));
        }
    };
}
export function doLogin(dispatch: Dispatch<IAppState>) {
    return async (username: string, password: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IResponse<ILoginResponseBody> = await localLoginRequest(username, password);

        if (isSuccessResponse(response.status)) {
            tokenManager.saveTokens(response.data!.tokens);
            dispatch(setUserModelActonBuilder(response.data!.user));
            dispatch(setLoggedInActionBuilder());
        }else {
            dispatch(setErrorActionBuilder(response.status));
        }
    };
}
export function doFacebookLogin(dispatch: Dispatch<IAppState>) {
    return async (fbToken: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IResponse<IFacebookLoginResponseBody> = await facebookLoginRequest(fbToken);
        
        if (isSuccessResponse(response.status)) {
            tokenManager.saveTokens(response.data!.tokens);
            dispatch(setUserModelActonBuilder(response.data!.user));
            dispatch(setLoggedInActionBuilder());
        } else {
            dispatch(setErrorActionBuilder(response.status));
        }
    };
}
export function doSetPostLoginRedirectLink(dispatch: Dispatch<IAppState>) {
    return (url: string) => {
        dispatch(setRedirectActionBuilder(url));
    };
}
