import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IAppState } from '../../redux/index';
import { doLogin, doFacebookLogin } from '../../redux/login/duck';

import './login.css';
import { RouteComponentProps, withRouter } from 'react-router';

interface IOwnProps {

}

interface IReduxProps {
    error?: number;
    isLoggedIn: boolean;
}

interface IActionProps {
    login: (username: string, password: string) => void;
    facebookLogin: (fbToken: string) => void;
}

interface IRouteProps {

}

interface IState {
    email: string;
    password: string;
}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;
type State = IState;

class LoginContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.history.replace('/');
        }
    }

    render() {
        const err = (error?: number) => {
            switch (error) {
                case 401:
                    return <h4>Wrong username or password</h4>;

                case 422:
                    return <h4>Enter username and password</h4>;

                default:
                    return null;
            }
        };

        return (
            <div className="center-horizontal">
                <h1>Login</h1>
                {err(this.props.error)}
                <input
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(evt) => this.setState({email: evt.target.value})}
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(evt) => this.setState({password: evt.target.value})}
                />
                <button onClick={() => this.onLoginClicked()}>Login</button>
            </div>
        );
    }

    onLoginClicked(): void {
        this.props.login(this.state.email, this.state.password);
    }

}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        error: appState.login.error,
        isLoggedIn: appState.login.model.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        login: doLogin(dispatch),
        facebookLogin: doFacebookLogin(dispatch),
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

export default withRouter<IOwnProps>(connectedContainer);