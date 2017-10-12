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

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;

class LoginContainer extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
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
                <div className="w-33">
                    <h1 className="t-c">Login</h1>
                    <LoginFormContainer registerRedirect="/register"/>
                </div>
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