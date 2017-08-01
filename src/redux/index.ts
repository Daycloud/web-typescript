
import { combineReducers } from 'redux';
import login, {LoginState} from "./login/reducer";

export interface AppState {
    login: LoginState
}

const reducer = combineReducers<AppState>({
    login
});

export default reducer;