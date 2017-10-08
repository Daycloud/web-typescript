import * as React from 'react';

import LoginFormComponent from './LoginFormComponent';
import { IAppState } from '../../../redux/index';
import { connect, Dispatch } from 'react-redux';
import { doLogin } from '../../../redux/login/duck';

interface IOwnProps {
    registerRedirect: string;
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

    return (
        <LoginFormComponent
            showLoading={props.showLoading}
            error={props.errorCode}
            onLoginClicked={props.login}
            registerRedirect={props.registerRedirect}
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