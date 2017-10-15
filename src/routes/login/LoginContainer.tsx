import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import { Link } from 'react-router-dom';

import { IAppState } from '../../redux/index';
import { doFacebookLogin } from '../../redux/login/duck';
import FacebookButton from '../../components/login/facebookbutton/FacebookButtonComponent';
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
                <div className="w-33 card m-t-l">
                    <h1 className="t-c">Login</h1>
                    <Switch>
                        <Route path={'/login/email'} exact={true}>
                            <div className="p-l">
                                <LoginFormContainer registerRedirect="/register"/>
                            </div>
                        </Route>
                        <Route path={'/'}>
                            <div>
                                <FacebookButton />
                                <Link to="/login/email"><h6 className="t-c">Email login</h6></Link>
                            </div>
                        </Route>
                    </Switch>
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