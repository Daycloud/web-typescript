import * as React from 'react';
import { IAppState } from '../../redux/index';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';

interface IOwnProps {

}

interface IReduxProps {
    isLoggedIn: boolean;
    redirectUrl?: string;
}

interface IRouterProps {
}

type Props = IOwnProps & IReduxProps & RouteComponentProps<IRouterProps>;

class LoginRedirector extends React.Component<Props, {}> {

    componentDidUpdate(prevProps: Props) {

        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (isLoggingIn && this.props.redirectUrl) {
            this.props.history.replace(this.props.redirectUrl);
        } else if (isLoggingOut) {
            this.props.history.replace('/login');
        }
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        isLoggedIn: appState.login.model.isLoggedIn,
        redirectUrl: appState.login.model.redirectUrl
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps
)(LoginRedirector);

export default withRouter<IOwnProps>(connectedContainer);