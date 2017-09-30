import * as React from 'react';
import {AppState} from "../../../redux/index";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";

interface OwnProps {

}

interface ReduxProps {
    isLoggedIn: boolean
}

interface RouterProps {
}

type Props = OwnProps & ReduxProps & RouteComponentProps<RouterProps>;

class EnsureloginContainer extends React.Component<Props, {}> {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            console.log('nono');
        }
    }

    render() {
        return <div>{ this.props.children }</div>;
    }
};

const mapStateToProps = (appState: AppState, props: Props): ReduxProps => {
    return {
        isLoggedIn: appState.login.isLoggedIn
    };
};

const connectedContainer = connect<ReduxProps, {}, OwnProps>(
    mapStateToProps
)(EnsureloginContainer);

export default connectedContainer;//withRouter<OwnProps>(connectedContainer);