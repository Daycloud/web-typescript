import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IAppState } from '../../redux/index';
import { doRegister } from '../../redux/register/duck';
import RegisterFormComponent from './RegisterFormComponent';

export interface IOwnProps {
    loginRedirect: string;
}

export interface IReduxProps {
    registerError?: number;
}

interface IActionProps {
    register: (email: string, password: string, displayName: string) => void;
}

export interface IState {
    email: string;
    displayName: string;
    password: string;
    passwordConfirmed: string;
    error: {
        email: boolean,
        displayName: boolean,
        password: boolean,
        passwordConfirmed: boolean
    };
}

type Props = IOwnProps & IReduxProps & IActionProps;
type State = IState;

const defaultErrors =  {
    email: false,
        displayName: false,
        password: false,
        passwordConfirmed: false
};

const defaultState = {
    email: '',
    displayName: '',
    password: '',
    passwordConfirmed: '',
    error: defaultErrors
};

class RegisterFormContainer extends React.Component<Props, State> {

    onRegisterClicked = () => {
        if (!this.formHasErrors()) {
            this.props.register(this.state.email, this.state.password, this.state.displayName);
        }
    }

    formHasErrors = (): boolean => {
        let hasErrors: boolean = false;
        let newState = {...this.state, error: {...defaultErrors}};

        if (this.state.email === '') {
            newState.error.email = true;
            hasErrors = true;
        }
        if (this.state.displayName === '') {
            newState.error.displayName = true;
            hasErrors = true;
        }
        if (this.state.password === '') {
            newState.error.password = true;
            hasErrors = true;
        }
        if (this.state.passwordConfirmed === '' || this.state.passwordConfirmed !== this.state.password) {
            newState.error.passwordConfirmed = true;
            hasErrors = true;
        }
        this.setState(newState);
        return hasErrors;
    }

    onEmailChanged = (email: string) => {
        this.setState({
            email: email
        });
    }

    onDisplayNameChanged = (displayName: string) => {
        this.setState({
            displayName: displayName
        });
    }

    onPasswordChanged = (password: string) => {
        this.setState({
            password: password
        });
    }

    onPasswordConfirmedChanged = (passwordConfirmed: string) => {
        this.setState({
            passwordConfirmed: passwordConfirmed
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.registerError) {
            this.setState({...this.state, error: {...this.state.error, email: true}});
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = defaultState;
    }

    render() {

        return (
            <RegisterFormComponent
                email={this.state.email}
                displayName={this.state.displayName}
                password={this.state.password}
                passwordConfirmed={this.state.passwordConfirmed}
                registerError={this.props.registerError}
                error={this.state.error}
                loginRedirect={this.props.loginRedirect}
                onEmailChanged={this.onEmailChanged}
                onDisplayNameChanged={this.onDisplayNameChanged}
                onPasswordChanged={this.onPasswordChanged}
                onPasswordConfirmedChanged={this.onPasswordConfirmedChanged}
                onRegisterClicked={this.onRegisterClicked}
            />
        );
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        registerError: appState.register.errorCode
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        register: doRegister(dispatch)
    };
};

const connectedContainer = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterFormContainer);

export default connectedContainer;