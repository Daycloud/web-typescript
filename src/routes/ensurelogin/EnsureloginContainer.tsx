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

class EnsureloginContainer extends React.Component<Props, {}> {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            alert('Not logged in');
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
)(EnsureloginContainer);

export default withRouter<IOwnProps>(connectedContainer);