import * as React from 'react';
import {AppState} from "../../redux/index";
import {connect} from "react-redux";

import './home.css';

interface OwnProps {

}

interface ReduxProps {

}

type Props = OwnProps & ReduxProps;
class Home extends React.Component<Props, {}> {

    componentDidMount() {
    }

    render() {
        return <div className="home">This is home</div>
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