import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import CloudsComponent from './CloudsComponent';
import { ICloudDTO } from '../../lib/api/dto/CloudDTO';
import { IAppState } from '../../redux/index';
import Spinner from '../../components/spinner/Spinner';
import { doFetchClouds } from '../../redux/clouds/duck';
import { Link } from 'react-router-dom';

interface IOwnProps {
}

interface IReduxProps {
    errorCode?: number;
    showLoading: boolean;
    clouds?: ICloudDTO[];
}

interface IActionProps {
    fetchClouds: () => void;
}

type Props = IOwnProps & IReduxProps & IActionProps;

class CloudsContainer extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchClouds();
    }

    component = (props: Props) => {
        if (props.showLoading) {
            return (
                <div style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
                    <Spinner colorClassName="bg-primary" large={true}/>
                </div>
            );
        } else if (props.clouds) {
            return (
                <div className="w-90 m-t-l">
                    <h2 className="t-c">Your clouds</h2>
                    <CloudsComponent clouds={props.clouds}/>
                </div>
            );
        } else if (props.errorCode) {
            return <div>Error loading clouds</div>;
        } else {
            return (
                <div className="w-33 t-c">
                    <h2>Welcome to Daycloud</h2>
                    <h5>Hi, and welcome to Daycloud. To get started, try &nbsp;
                        <Link to="/create">creating</Link> or <Link to="/join">joining</Link> a cloud.
                    </h5>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="w-100 center-horizontal">
                {this.component(this.props)}
            </div>
        );
    }
}

const mapStateToProps = (appState: IAppState, props: IOwnProps): IReduxProps => {
    return {
        showLoading: appState.clouds.isLoading,
        errorCode: appState.login.errorCode,
        clouds: appState.clouds.model.clouds
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        fetchClouds: doFetchClouds(dispatch)
    };
};

const connectedContainer = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CloudsContainer);

export default connectedContainer;