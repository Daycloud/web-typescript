import { IUserDTO } from '../../lib/api/dto/UserDTO';

enum TypeKeys {
    SET_MODEL = 'LOGIN_ACTION_SET_MODEL',
    DEFAULT = '__DEFAULT_ACTION__'
}

interface IModelAction {
    type: TypeKeys.SET_MODEL;
    user: IUserDTO;
}
type ActionTypes =
    | IModelAction;

export function setModelActionBuilder(user: IUserDTO): IModelAction {
    return { type: TypeKeys.SET_MODEL, user: user };
}

export interface IUserState {
    user?: IUserDTO;
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