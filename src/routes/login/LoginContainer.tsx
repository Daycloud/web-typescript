import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IAppState } from '../../redux/index';
import { doLogin, doFacebookLogin } from '../../redux/login/duck';

interface IOwnProps {

}

interface IReduxProps {
}

interface IActionProps {
    login: (username: string, password: string) => void;
    facebookLogin: (fbToken: string) => void;
}

type Props = IOwnProps & IReduxProps & IActionProps;
class Login extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.login('', '');
    }

    render() {
        return <div>Login</div>;
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
    };
};
const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        login: doLogin(dispatch),
        facebookLogin: doFacebookLogin(dispatch),
    };
};

const login = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default login;