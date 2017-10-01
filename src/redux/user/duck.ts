import { UserDAO } from './../../lib/api/dto/UserDAO';

enum TypeKeys {
    SET_MODEL = 'LOGIN_ACTION_SET_MODEL',
    DEFAULT = '__DEFAULT_ACTION__'
}

interface IModelAction {
    type: TypeKeys.SET_MODEL;
    user: UserDAO;
}
type ActionTypes =
    | IModelAction;

export function setModelActionBuilder(user: UserDAO): IModelAction {
    return { type: TypeKeys.SET_MODEL, user: user };
}

export interface IUserState {
    user?: UserDAO;
}
const initialState: IUserState = {
    user: undefined
};
export function UserReducer(state: IUserState = initialState, action: ActionTypes): IUserState {
    switch (action.type) {
        case TypeKeys.SET_MODEL:
            return {...state, user: action.user};
        default:
            return state;
    }
}