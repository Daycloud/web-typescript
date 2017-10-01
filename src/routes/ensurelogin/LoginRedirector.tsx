import * as React from 'react';
import { IAppState } from '../../redux/index';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';

interface IOwnProps {

}

interface IReduxProps {
    isLoggedIn: boolean;
}

interface IRouterProps {
}

type Props = IOwnProps & IReduxProps & RouteComponentProps<IRouterProps>;

class LoginRedirector extends React.Component<Props, {}> {

    componentDidUpdate(prevProps: Props) {

        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (isLoggingIn) {
            this.props.history.replace('/');
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        isLoggedIn: appState.login.isLoggedIn
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps
)(LoginRedirector);

export default withRouter<IOwnProps>(connectedContainer);