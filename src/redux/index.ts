import { combineReducers } from 'redux';

import { ILoginState, LoginReducer } from './login/duck';
import { IUserState, UserReducer } from './user/duck';
import { IInvitationState, InvitationReducer, } from './invitation/duck';

export interface IAppState {
    login: ILoginState;
    user: IUserState;
    invitation: IInvitationState;
}

const reducer = combineReducers<IAppState>({
    login: LoginReducer,
    user: UserReducer,
    invitation: InvitationReducer
});

export default reducer;