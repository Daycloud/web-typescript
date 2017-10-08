import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IAppState } from '../../redux/index';
import { doLogin, doFacebookLogin } from '../../redux/login/duck';

import { RouteComponentProps, withRouter } from 'react-router';
import { IInvitationDTO } from '../../lib/api/dto/InvitationDTO';
import { doFetchInvitation } from '../../redux/invitation/duck';
import JoinComponent from './JoinComponent';

interface IOwnProps {}

interface IReduxProps {
    loginError?: number;
    isLoggedIn: boolean;
    isLoadingLoggingIn: boolean;

    isLoadingInvitation: boolean;
    invitation?: IInvitationDTO;
    invitationError?: number;
}

interface IActionProps {
    login: (username: string, password: string) => void;
    facebookLogin: (fbToken: string) => void;
    fetchInvitation: (key: string) => void;
}

interface IRouteProps {}

interface IState {}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;
type State = IState;

class LoginContainer extends React.Component<Props, State> {

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const key = params.get('key');
        if (key) {
            this.props.fetchInvitation(key);
        }else {
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <JoinComponent
                invitation={this.props.invitation}
                invitationError={this.props.invitationError}
            />
        );
    }

}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        loginError: appState.login.errorCode,
        isLoggedIn: appState.login.model.isLoggedIn,
        isLoadingLoggingIn: appState.login.isLoading,
        invitation: appState.invitation.invitation,
        isLoadingInvitation: appState.invitation.loading,
        invitationError: appState.invitation.error
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        login: doLogin(dispatch),
        facebookLogin: doFacebookLogin(dispatch),
        fetchInvitation: doFetchInvitation(dispatch)
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

export default withRouter<IOwnProps>(connectedContainer);