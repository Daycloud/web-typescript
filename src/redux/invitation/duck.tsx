
import { IInvitationDTO } from '../../lib/api/dto/InvitationDTO';
import { Dispatch } from 'react-redux';
import { IAppState } from '../index';
import { IResponse, isSuccessResponse } from '../../lib/api/util/index';
import { fetchInvitationRequest, IFetchInvitationResponse } from '../../lib/api/invitations';

enum TypeKeys {
    SET_MODEL = 'INVITATION_ACTION_SET_MODEL',
    LOADING = 'INVITATION_ACTION_LOADING',
    ERROR = 'INVITATION_ACTION_ERROR',
    DEFAULT = '__DEFAULT_ACTION__'
}

interface IModelAction {
    type: TypeKeys.SET_MODEL;
    invitation: IInvitationDTO;
}
interface ILoadingAction {
    type: TypeKeys.LOADING;
}
interface IErrorAction {
    type: TypeKeys.ERROR;
    error: number;
}
type ActionTypes =
    | IModelAction
    | IErrorAction
    | ILoadingAction;

function setLoadingActionBuilder(): ILoadingAction {
    return { type: TypeKeys.LOADING };
}
function setModelActionBuilder(invitation: IInvitationDTO): IModelAction {
    return { type: TypeKeys.SET_MODEL, invitation: invitation };
}

function setErrorActionBuilder(error: number): IErrorAction {
    return { type: TypeKeys.ERROR, error: error };
}

export interface IInvitationState {
    invitation?: IInvitationDTO;
    loading: boolean;
    error?: number;

}
const initialState: IInvitationState = {
    invitation: undefined,
    loading: false,
    error: undefined
};
export function InvitationReducer(state: IInvitationState = initialState, action: ActionTypes): IInvitationState {
    switch (action.type) {
        case TypeKeys.SET_MODEL:
            return {...state, invitation: action.invitation, error: undefined, loading: false};
        case TypeKeys.ERROR:
            return {...state, invitation: undefined, error: action.error, loading: false};
        case TypeKeys.LOADING:
            return {...state, invitation: undefined, error: undefined, loading: true};
        default:
            return state;
    }
}
export function doFetchInvitation(dispatch: Dispatch<IAppState>) {
    return async (key: string) => {
        dispatch(setLoadingActionBuilder());
        let response: IResponse<IFetchInvitationResponse> = await fetchInvitationRequest(key);

        if (isSuccessResponse(response.status)) {
            dispatch(setModelActionBuilder(response.data!.invitation));
        }else {
            dispatch(setErrorActionBuilder(response.status));
        }
    };
}