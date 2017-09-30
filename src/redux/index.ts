
import { combineReducers } from 'redux';
import {LoginState, LoginReducer} from "./login/duck";

export interface AppState {
    login: LoginState
}

const reducer = combineReducers<AppState>({
    login: LoginReducer
});

export default reducer;