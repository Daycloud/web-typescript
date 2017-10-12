import * as React from 'react';
import { IAppState } from '../../redux/index';
import { connect } from 'react-redux';

import './home.css';
import CloudsContainer from '../clouds/CloudsContainer';

interface IOwnProps {

}

interface IReduxProps {

}

type Props = IOwnProps & IReduxProps;

const Home = (props: Props) => {
        return <CloudsContainer />;
};

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
    };
};

const home = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps
)(Home);

export default home;