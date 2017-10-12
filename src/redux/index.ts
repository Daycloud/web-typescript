import { combineReducers } from 'redux';

import { ILoginState, LoginReducer } from './login/duck';
import { IUserState, UserReducer } from './user/duck';
import { IInvitationState, InvitationReducer, } from './invitation/duck';
import { IJoinByKeyState, JoinByKeyReducer } from './join/duck';
import { IRegisterState, RegisterReducer } from './register/duck';
import { CloudsReducer, ICloudsState } from './clouds/duck';

export interface IAppState {
    login: ILoginState;
    user: IUserState;
    invitation: IInvitationState;
    join: IJoinByKeyState;
    register: IRegisterState;
    clouds: ICloudsState;
}

const reducer = combineReducers<IAppState>({
    login: LoginReducer,
    user: UserReducer,
    invitation: InvitationReducer,
    joinByKey: JoinByKeyReducer,
    register: RegisterReducer,
    clouds: CloudsReducer
});

export default reducer;