import * as React from 'react';
import {AppState} from "../../../redux/index";
import {connect} from "react-redux";

interface OwnProps {

}

interface ReduxProps {

}

type Props = OwnProps & ReduxProps;
class Home extends React.Component<Props, {}> {

    componentDidMount() {
    }

    render() {
        return <div></div>
    }
};

const mapStateToProps = (appState: AppState, props: Props): ReduxProps => {
    return {
    };
};

const home = connect<ReduxProps, {}, OwnProps>(
    mapStateToProps
)(Home);

export default home;