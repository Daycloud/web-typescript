import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IPublicUserDTO } from '../../../../lib/api/dto/UserDTO';
import MembersComponent from './MembersComponent';
import { IAppState } from '../../../../redux/index';
import { ICloudDTO } from '../../../../lib/api/dto/CloudDTO';

interface IOwnProps {
}

interface IReduxProps {
    members?: IPublicUserDTO[];
}

interface IActionProps {
}

interface IRouteProps {
    cloudId: string;
}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;

class MembersContainer extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            this.props.members ?
            <MembersComponent members={this.props.members}/> : <div>No members</div>
        );
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    const currentCloud = appState.clouds.model.clouds ? appState.clouds.model.clouds.find((cloud: ICloudDTO) => {
        return cloud._id === props.match.params.cloudId;
    }) : undefined;
    return {
        members: currentCloud ? currentCloud.members : undefined
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
    };
};

const connectedContainer = connect<IReduxProps, {}, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(MembersContainer);

export default connectedContainer;