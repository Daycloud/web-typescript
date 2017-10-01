import { combineReducers } from 'redux';

import { ILoginState, LoginReducer } from './login/duck';
import { IUserState, UserReducer } from './user/duck';

export interface IAppState {
    login: ILoginState;
    user: IUserState;
}

const reducer = combineReducers<IAppState>({
    login: LoginReducer,
    user: UserReducer,
});

export default reducer;