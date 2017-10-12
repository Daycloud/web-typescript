import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ICloudDTO } from '../../../lib/api/dto/CloudDTO';

interface IProps {
    cloud: ICloudDTO;
}

interface IRouteProps {
    cloudId: string;
}

type Props = IProps & RouteComponentProps<IRouteProps>;

const CloudComponent = (props: Props) => {

    return (
        <div className="center-horizontal">
            <h1>
                CloudID: {props.match.params.cloudId}
            </h1>
        </div>
    );
};

export default withRouter<IProps>(CloudComponent);