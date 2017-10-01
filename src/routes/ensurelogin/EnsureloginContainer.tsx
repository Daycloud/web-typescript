import * as React from 'react';
import { IAppState } from '../../redux/index';
import { RouteComponentProps, withRouter } from 'react-router';
import {connect, Dispatch} from 'react-redux';
import {doSetPostLoginRedirectLink} from "../../redux/login/duck";

interface IOwnProps {

}

interface IReduxProps {
    isLoggedIn: boolean;
}

interface IActionProps {
    setRedirectUrl: (url: string) => void;
}

interface IRouterProps {
}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouterProps>;

class EnsureloginContainer extends React.Component<Props, {}> {

    componentDidMount() {

        if (!this.props.isLoggedIn) {
            this.props.setRedirectUrl(this.props.history.location.pathname);
            this.props.history.push('/login');
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

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        setRedirectUrl: doSetPostLoginRedirectLink(dispatch),
    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps,
    mapDispatchToProps
)(EnsureloginContainer);

export default withRouter<IOwnProps>(connectedContainer);