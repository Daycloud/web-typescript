
import { combineReducers } from 'redux';
import {LoginState, LoginReducer} from "./login/duck";
import {UserState, UserReducer} from './user/duck';

export interface AppState {
    login: LoginState;
    user: UserState;
}

const reducer = combineReducers<AppState>({
    login: LoginReducer,
    user: UserReducer,
});

export default reducer;