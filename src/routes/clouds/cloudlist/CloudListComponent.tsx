import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ICloudDTO } from '../../../lib/api/dto/CloudDTO';

import './CloudListComponent.css';

interface IProps {
    cloud: ICloudDTO;
}

interface IRouteProps {

}

type Props = IProps & RouteComponentProps<IRouteProps>;

const CloudComponent = (props: Props) => {

    return (
        <div className="cloud-list-component" onClick={() => props.history.push(`/clouds/${props.cloud._id}`)}>
            <div className="image-filter" />
            <img className="cloud-image" src="https://ritzcarlton-h.assetsadobe.com/is/image/content/dam/the-ritz-carlton/hotels/asia-pacific/singapore/singapore/new-images/05_KLK%20Photography_Ritz%20Carlton%202016.png?$XlargeViewport100pct$" />
            <h3 className="cloud-title">{props.cloud.name}</h3>
        </div>
    );
};

export default withRouter<IProps>(CloudComponent);