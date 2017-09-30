import * as React from 'react';
import {AppState} from "../../../redux/index";
import {connect, Dispatch} from "react-redux";
import { doLogin } from '../../../redux/login/duck';
interface OwnProps {

}

interface ReduxProps {
}

interface ActionProps {
    login: (username: string, password: string) => void
}

type Props = OwnProps & ReduxProps & ActionProps;
class Login extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.login('','');
    }

    render() {
        return <div>Login</div>
    }
};

const mapStateToProps = (appState: AppState, props: Props): ReduxProps => {
    return {
    };
};
const mapDispatchToProps = (dispatch: Dispatch<AppState>): ActionProps => {
    return {
        login: doLogin(dispatch)
    }
};

const login = connect<ReduxProps, {}, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default login;