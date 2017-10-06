
export interface IStoreState<T> {
    model?: T;
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
    initialState: IStoreState<T> = {
        isLoading: false,
        isBackgroundLoading: false
    };
    readonly TYPEKEY_LOADING: string;
    readonly TYPEKEY_LOADING_BACKGROUND: string;
    readonly TYPEKEY_SET_MODEL: string;
    readonly TYPEKEY_SET_ERROR: string;

    constructor(name: string) {
        this.name = name;
        this.TYPEKEY_LOADING = `${this.name}_ACTION_LOADING`;
        this.TYPEKEY_LOADING_BACKGROUND = `${this.name}_ACTION_LOADING_BACKGROUND`;
        this.TYPEKEY_LOADING = `${this.name}_ACTION_SET_MODEL`;
        this.TYPEKEY_LOADING = `${this.name}_ACTION_SET_ERROR`;
    }
    createSetLoadingAction(): IAction<T> {
        return { type: this.TYPEKEY_LOADING };
    }
    createSetBackgroundLoadingAction(): IAction<T> {
        return { type: this.TYPEKEY_LOADING_BACKGROUND };
    }
    createSetModelAction(model: T): IAction<T> {
        return { type: this.TYPEKEY_SET_MODEL, model: model };
    }
    createSetErrorAction(error: number): IAction<T> {
        return { type: this.TYPEKEY_SET_ERROR, error: error };
    }
    reducer(state: IStoreState<T> = this.initialState, action: IAction<T>): IStoreState<T> {
        switch (action.type) {
            case this.TYPEKEY_LOADING:
                return { isLoading: true, isBackgroundLoading: false };
            case this.TYPEKEY_LOADING_BACKGROUND:
                return { isLoading: false, isBackgroundLoading: true };
            case this.TYPEKEY_SET_MODEL:
                return { isLoading: false, isBackgroundLoading: false, model: action.model };
            case this.TYPEKEY_SET_ERROR:
                return { isLoading: false, isBackgroundLoading: false, error: action.error };
            default:
                return state;
        }
    }

}