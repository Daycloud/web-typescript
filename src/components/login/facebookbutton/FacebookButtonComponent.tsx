import * as React from 'react';

import Button from '../../button/Button';
import AuthResponse = facebook.AuthResponse;
import { IAppState } from '../../../redux/index';
import { doFacebookLogin } from '../../../redux/login/duck';
import { connect, Dispatch } from 'react-redux';

interface IOwnProps {

}

interface IReduxProps {
    isLoading: boolean;
}

interface IActionProps {
    loginWithFacebook: (fbToken: string) => void;
}

interface IState {
    isLoading: boolean;
}

type Props = IOwnProps & IReduxProps & IActionProps;

class FacebookButton extends React.Component<Props, IState> {
    handleFBResponse(response: AuthResponse): void {
        if (response.status === 'connected') {
            this.props.loginWithFacebook(response.authResponse.accessToken);
        }
        this.setState({isLoading: false});
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    onClick = () => {
        FB.login(
            (response: AuthResponse) => {
                this.handleFBResponse(response);
            },
            {scope: 'email, user_friends'});
    }

    componentDidMount() {

    }

    render() {
        return (
            <Button
                text="Continue with Facebook"
                onClick={this.onClick}
                loading={this.state.isLoading || this.props.isLoading}
            />
        );
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        isLoading: appState.login.isLoading
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        loginWithFacebook: doFacebookLogin(dispatch)
    };
};

const connectedContainer = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(FacebookButton);

export default connectedContainer;