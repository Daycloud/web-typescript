import { Dispatch } from 'redux';

import {
    ILoginResponseBody,
    localLoginRequest,
    IFacebookLoginResponseBody,
    facebookLoginRequest,
    refreshTokenRequest,
    IRefreshTokenResponseBody } from '../../lib/api/login';
import tokenManager from '../../lib/api/TokenManager';
import { setModelActionBuilder as setUserModelActonBuilder } from '../user/duck';
import { IAppState } from '../index';

enum TypeKeys {
    LOADING = 'LOGIN_ACTION_LOADING',
    SET_MODEL = 'LOGIN_ACTION_SET_MODEL',
    ERROR = 'LOGIN_ACTION_ERROR',
    DEFAULT = '__DEFAULT_ACTION__'
}

interface ILoadingAction {
    type: TypeKeys.LOADING;
}
interface IModelAction {
    type: TypeKeys.SET_MODEL;
}
interface IErrorAction {
    type: TypeKeys.ERROR;
    error: string;
}
type ActionTypes =
    | ILoadingAction
    | IModelAction
    | IErrorAction;

function setLoadingActionBuilder(): ILoadingAction {
    return { type: TypeKeys.LOADING };
}
function setModelActionBuilder(): IModelAction {
    return { type: TypeKeys.SET_MODEL };
}
function setErrorActionBuilder(error: string): IErrorAction {
    return { type: TypeKeys.ERROR, error: error };
}

export interface ILoginState {
    requestInProgress: boolean;
    isLoggedIn: boolean;
}
const initialState: ILoginState = {
    requestInProgress: false,
    isLoggedIn: false,
};
export function LoginReducer(state: ILoginState = initialState, action: ActionTypes): ILoginState {
    switch (action.type) {
        case TypeKeys.LOADING:
            return { ...state, requestInProgress: true };
        case TypeKeys.SET_MODEL:
            return { ...state, requestInProgress: false, isLoggedIn: true };
        case TypeKeys.ERROR:
            return { ...state, requestInProgress: false, isLoggedIn: false };
        default:
            return state;
    }
}

export function doRefreshTokens(dispatch: Dispatch<IAppState>) {
    return async (refreshToken: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IRefreshTokenResponseBody;
        try {
            response = await refreshTokenRequest(refreshToken);
            tokenManager.saveTokens(response.tokens);
        } catch (e) {
            dispatch(setErrorActionBuilder(e));
            return;
        }
        dispatch(setModelActionBuilder());
        dispatch(setUserModelActonBuilder(response.user));
    };
}
export function doLogin(dispatch: Dispatch<IAppState>) {
    return async (username: string, password: string) => {
        dispatch(setLoadingActionBuilder());
        let response: ILoginResponseBody;
        try {
            response = await localLoginRequest(username, password);
            tokenManager.saveTokens(response.tokens);
        } catch (e) {
            dispatch(setErrorActionBuilder(e));
            return;
        }
        dispatch(setModelActionBuilder());
        dispatch(setUserModelActonBuilder(response.user));
    };
}
export function doFacebookLogin(dispatch: Dispatch<IAppState>) {
    return async (fbToken: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IFacebookLoginResponseBody;
        try {
            response = await facebookLoginRequest(fbToken);
            tokenManager.saveTokens(response.tokens);
        } catch (e) {
            dispatch(setErrorActionBuilder(e));
            return;
        }
        dispatch(setModelActionBuilder());
        dispatch(setUserModelActonBuilder(response.user));
    };
}
