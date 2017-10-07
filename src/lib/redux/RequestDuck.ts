import { IStoreState } from './RequestDuck';

let names: string[] = [];
function checkAndAppendName(name: string) {
    let exists = names.some((n) => { return name === n; });
    if (exists) {
        throw new Error(
            'Two RequestDuck classes has been initialized with the same name. ' +
            'This name has to be unique in order for redux to map the actions properly'
        );
    } else {
        names.push(name);
    }
}

export interface IStoreState<T> {
    model: T;
    error?: number;
    isLoading: boolean;
    isBackgroundLoading: boolean;
}

interface IAction<T> {
    type: string;
    error?: number;
    model?: T;
}

export default class RequestDuck<T> {

    name: string;
    lastState: IStoreState<T>;
    readonly INITIAL_STATE: IStoreState<T>;
    readonly TYPEKEY_LOADING: string;
    readonly TYPEKEY_LOADING_BACKGROUND: string;
    readonly TYPEKEY_SET_MODEL: string;
    readonly TYPEKEY_SET_ERROR: string;

    constructor(name: string, initialModel: T) {
        checkAndAppendName(name);
        this.name = name;
        this.TYPEKEY_LOADING = `${this.name}_ACTION_LOADING`;
        this.TYPEKEY_LOADING_BACKGROUND = `${this.name}_ACTION_LOADING_BACKGROUND`;
        this.TYPEKEY_SET_MODEL = `${this.name}_ACTION_SET_MODEL`;
        this.TYPEKEY_SET_ERROR = `${this.name}_ACTION_SET_ERROR`;
        this.INITIAL_STATE = {
            isLoading: false,
            isBackgroundLoading: false,
            model: initialModel
        };
    }
    createSetLoadingAction = (): IAction<T> => {
        return { type: this.TYPEKEY_LOADING };
    }
    createSetBackgroundLoadingAction = (): IAction<T> => {
        return { type: this.TYPEKEY_LOADING_BACKGROUND };
    }
    createSetModelAction = (model: T): IAction<T> => {
        return { type: this.TYPEKEY_SET_MODEL, model: model };
    }
    createSetErrorAction = (error: number): IAction<T> => {
        return { type: this.TYPEKEY_SET_ERROR, error: error };
    }
    reducer = (state: IStoreState<T>, action: IAction<T>): IStoreState<T> => {
        if (!state) {
            state = this.INITIAL_STATE;
        }
        this.lastState = state;
        switch (action.type) {
            case this.TYPEKEY_LOADING:
                return { isLoading: true, isBackgroundLoading: false, model: state.model };
            case this.TYPEKEY_LOADING_BACKGROUND:
                return { isLoading: false, isBackgroundLoading: true, model: state.model };
            case this.TYPEKEY_SET_MODEL:
                return { 
                    isLoading: false, isBackgroundLoading: false, model: Object.assign(state.model, action.model)
                };
            case this.TYPEKEY_SET_ERROR:
                return { isLoading: false, isBackgroundLoading: false, error: action.error, model: state.model };
            default:
                return state;
        }
    }
}