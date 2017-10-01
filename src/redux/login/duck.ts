import { ILoginResponseBody, localLoginRequest, IFacebookLoginResponseBody, facebookLoginRequest, refreshTokenRequest, IRefreshTokenResponseBody } from './../../lib/api/login';
import { Dispatch } from 'redux';
import tokenManager from '../../lib/api/TokenManager';
import { setModelActionBuilder as setUserModelActonBuilder } from '../user/duck';

enum TypeKeys {
    LOADING = 'LOGIN_ACTION_LOADING',
    SET_MODEL = 'LOGIN_ACTION_SET_MODEL',
    ERROR = 'LOGIN_ACTION_ERROR',
    DEFAULT = '__DEFAULT_ACTION__'
};

interface LoadingAction {
    type: TypeKeys.LOADING;
}
interface ModelAction {
    type: TypeKeys.SET_MODEL;
}
interface ErrorAction {
    type: TypeKeys.ERROR;
    error: string;
}
type ActionTypes =
    | LoadingAction
    | ModelAction
    | ErrorAction;

function setLoadingActionBuilder(): LoadingAction {
    return { type: TypeKeys.LOADING };
}
function setModelActionBuilder(): ModelAction {
    return { type: TypeKeys.SET_MODEL };
}
function setErrorActionBuilder(error: string): ErrorAction {
    return { type: TypeKeys.ERROR, error: error };
}

export interface LoginState {
    requestInProgress: boolean,
    isLoggedIn: boolean,
}
const initialState: LoginState = {
    requestInProgress: false,
    isLoggedIn: false,
}
export function LoginReducer(state: LoginState = initialState, action: ActionTypes): LoginState {
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

export function doRefreshTokens(dispatch: Dispatch<any>) {
    return async (refreshToken: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IRefreshTokenResponseBody
        try {
            response = await refreshTokenRequest(refreshToken);
            tokenManager.saveTokens(response.tokens);
        }
        catch(e) {
            dispatch(setErrorActionBuilder(e));
            return;
        }
        dispatch(setModelActionBuilder());
        dispatch(setUserModelActonBuilder(response.user));
    }
}
export function doLogin(dispatch: Dispatch<any>) {
    return async (username: string, password: string) => {
        dispatch(setLoadingActionBuilder());
        let response: ILoginResponseBody;
        try {
            response = await localLoginRequest(username, password);
            tokenManager.saveTokens(response.tokens);
        }
        catch (e) {
            dispatch(setErrorActionBuilder(e));
            return;
        }
        dispatch(setModelActionBuilder());
        dispatch(setUserModelActonBuilder(response.user));
    }
}
export function doFacebookLogin(dispatch: Dispatch<any>) {
    return async (fbToken: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IFacebookLoginResponseBody;
        try {
            response = await facebookLoginRequest(fbToken);
            tokenManager.saveTokens(response.tokens);
        }
        catch (e) {
            dispatch(setErrorActionBuilder(e));
            return;
        }
        dispatch(setModelActionBuilder());
        dispatch(setUserModelActonBuilder(response.user));
    }
}
