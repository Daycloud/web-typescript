import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ICloudDTO } from '../../../lib/api/dto/CloudDTO';
import { apiBaseUrl } from '../../../lib/api/util/index';
import ImageContainer from '../../../components/image/ImageContainer';

import './CloudListComponent.css';

interface IProps {
    cloud: ICloudDTO;
}

interface IRouteProps {

}

type Props = IProps & RouteComponentProps<IRouteProps>;

const CloudComponent = (props: Props) => {

    const firstImage = props.cloud.cloudImages[0];

    const imgSrc = firstImage
        ? `${apiBaseUrl}/clouds/${props.cloud._id}/images/${firstImage._id}/image?type=standard`
        : null;

    return (
        <div className="cloud-list-component" onClick={() => props.history.push(`/clouds/${props.cloud._id}`)}>
            {imgSrc ? <ImageContainer url={imgSrc} /> : null}
            <div className="image-filter" />
            <h3 className="cloud-title">{props.cloud.name}</h3>
        </div>
    );
};

export default withRouter<IProps>(CloudComponent);