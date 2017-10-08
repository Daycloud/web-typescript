import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { IAppState } from '../../redux/index';
import { doFacebookLogin } from '../../redux/login/duck';
import LoginFormContainer from '../../components/login/loginform/LoginFormContainer';

import './login.css';

interface IOwnProps {

}

interface IReduxProps {
    error?: number;
    isLoggedIn: boolean;
}

interface IActionProps {
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

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    render() {

        return (
            <div className="center-horizontal">
                <h1>Login</h1>
                <LoginFormContainer registerRedirect="/register"/>
            </div>
        );
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        error: appState.login.errorCode,
        isLoggedIn: appState.login.model.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        facebookLogin: doFacebookLogin(dispatch),
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

export default withRouter<IOwnProps>(connectedContainer);