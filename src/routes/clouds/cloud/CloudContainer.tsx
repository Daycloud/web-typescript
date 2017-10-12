import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import CloudComponent from './CloudComponent';
import { RouteComponentProps } from 'react-router';
import { ICloudDTO } from '../../../lib/api/dto/CloudDTO';
import Spinner from '../../../components/spinner/Spinner';
import { IAppState } from '../../../redux/index';
import { doFetchClouds } from '../../../redux/clouds/duck';

interface IOwnProps {
}

interface IReduxProps {
    errorCode?: number;
    showLoading: boolean;
    cloud?: ICloudDTO;
    shouldFetchClouds: boolean;
}

interface IActionProps {
    fetchClouds: () => void;
}

interface IRouteProps {
    cloudId: string;
}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;

class CloudContainer extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.shouldFetchClouds) {
            this.props.fetchClouds();
        }
    }

    component = (props: Props) => {
        if (props.showLoading) {
            return (
                <div style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
                    <Spinner colorClassName="bg-primary" large={true}/>
                </div>
            );
        } else if (props.cloud) {
            return (
                <div className="w-90 m-t-l">
                    <CloudComponent cloud={props.cloud}/>
                </div>
            );
        } else if (props.errorCode) {
            return <div>Error loading cloud</div>;
        } else {
            return (
                <div className="w-33 t-c">
                    <h2>Cloud not found</h2>
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

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {
        showLoading: appState.clouds.isLoading,
        errorCode: appState.login.errorCode,
        shouldFetchClouds: appState.clouds.model.clouds === undefined,
        cloud: appState.clouds.model.clouds ? appState.clouds.model.clouds.find((cloud: ICloudDTO) => {
            return cloud._id === props.match.params.cloudId;
        }) : undefined
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
)(CloudContainer);

export default connectedContainer;