import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IAppState } from '../../redux/index';
import { doLogin, doFacebookLogin } from '../../redux/login/duck';

import { RouteComponentProps, withRouter } from 'react-router';
import { IInvitationDTO } from '../../lib/api/dto/InvitationDTO';
import { doFetchInvitation } from '../../redux/invitation/duck';
import JoinComponent from './JoinComponent';
import { doJoinByKey } from '../../redux/join/duck';
import { Link } from 'react-router-dom';

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
    joinByKey: (key: string) => void;
}

interface IRouteProps {}

interface IState {
    joinKey: string;
}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;
type State = IState;

class LoginContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            joinKey: ''
        };
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const key = params.get('key');
        if (key) {
            this.props.fetchInvitation(key);
            this.state = {
                joinKey: key
            };
        }else {
            this.props.history.replace('/');
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isLoggedIn) {
            nextProps.joinByKey(this.state.joinKey);
        }
    }

    render() {
        return (
            <div>
                {this.props.invitation
                    ? <JoinComponent
                        invitation={this.props.invitation}
                        joinKey={this.state.joinKey}
                    />
                    : <div
                        className="w-100 t-c m-t-l center-horizontal"
                    >
                        Key not found
                        <Link to="/">Home</Link>
                    </div>
                }
            </div>
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
        fetchInvitation: doFetchInvitation(dispatch),
        joinByKey: doJoinByKey(dispatch),
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

export default withRouter<IOwnProps>(connectedContainer);