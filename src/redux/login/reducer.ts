import { Action } from 'redux';
import {LoginConstants} from "./constants";

export interface LoginState {
    isLoading: boolean;
    errorMessage?: string;
    accessToken?: string;
    isLoggedIn: boolean;
}

const initialState: LoginState = {
    isLoading: false,
    isLoggedIn: false
};

export type LoginAction = Action & LoginState;

const LoginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginConstants.START_LOADING:
            return {...state, isLoading: true, errorMessage: undefined, accessToken: undefined, isLoggedIn: false};
        case LoginConstants.SUCCESS:
            return {...state, isLoading: false, errorMessage: undefined, accessToken: action.accessToken, isLoggedIn: true};
        case LoginConstants.FAILURE:
            return {...state, errorMessage: action.errorMessage, isLoading: false, accessToken: undefined, isLoggedIn: false};
        default:
            return state;
    }
}

export default (state: LoginState = initialState, action: Action) => {
    if(action.type === LoginConstants.SUCCESS || action.type === LoginConstants.FAILURE || action.type === LoginConstants.START_LOADING){
        return LoginReducer(state, (action as LoginAction));
    }
    return state;
}