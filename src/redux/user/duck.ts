import { UserDAO } from './../../lib/api/dto/UserDAO';

enum TypeKeys {
    SET_MODEL = 'LOGIN_ACTION_SET_MODEL',
    DEFAULT = '__DEFAULT_ACTION__'
};

interface ModelAction {
    type: TypeKeys.SET_MODEL;
    user: UserDAO;
}
type ActionTypes =
    | ModelAction

export function setModelActionBuilder(user: UserDAO): ModelAction {
    return { type: TypeKeys.SET_MODEL, user: user };
}

export interface UserState {
    user?: UserDAO;
}
const initialState: UserState = {
    user: undefined
}
export function UserReducer(state: UserState = initialState, action: ActionTypes): UserState {
    switch (action.type) {
        case TypeKeys.SET_MODEL:
            return {...state, user: action.user};
        default:
            return state;
    }
}