import * as React from 'react';

import LoginFormComponent from './LoginFormComponent';
import { IAppState } from '../../../redux/index';
import { connect, Dispatch } from 'react-redux';
import { doLogin } from '../../../redux/login/duck';

interface IOwnProps {
}

interface IReduxProps {
    errorCode?: number;
    showLoading: boolean;
}

interface IActionProps {
    login: (username: string, password: string) => void;
}

type Props = IOwnProps & IReduxProps & IActionProps;

const LoginFormContainer = (props: Props) => {

    const err = (error?: number): string | undefined => {
        switch (error) {
            case 401:
                return 'Wrong username or password';

            case 422:
                return 'Enter username and password';

            default:
                return undefined;
        }
    };

    return (
        <LoginFormComponent
            showLoading={props.showLoading}
            error={err(props.errorCode)}
            onLoginClicked={props.login}
        />
    );
};

const mapStateToProps = (appState: IAppState, props: IOwnProps): IReduxProps => {
    return {
        showLoading: appState.login.isLoading,
        errorCode: appState.login.errorCode
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        login: doLogin(dispatch)
    };
};

const connectedContainer = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginFormContainer);

export default connectedContainer;