import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { ICloudDTO } from '../../../lib/api/dto/CloudDTO';
import { ICloudImageDTO } from '../../../lib/api/dto/CloudImageDTO';
import { apiBaseUrl } from '../../../lib/api/util/index';
import ImageContainer from '../../../components/image/ImageContainer';

import './Cloud.css';

interface IProps {
    cloud: ICloudDTO;
}

interface IRouteProps {
}

type Props = IProps & RouteComponentProps<IRouteProps>;

const CloudComponent = (props: Props) => {

    const images = props.cloud.cloudImages.map((cloudImage: ICloudImageDTO) => {
        return (
            <div key={cloudImage._id} className="cloud-gallery-image">
                <ImageContainer
                    url={`${apiBaseUrl}/clouds/${props.cloud._id}/images/${cloudImage._id}/image?type=standard`}
                />
            </div>
        );
    });

    return (
        <div className="center-horizontal">
            <h1>
                {props.cloud.name}
            </h1>
            <h4>Images: {props.cloud.cloudImages.length} |
                <Link to={`${props.location.pathname}/guests`} >Members: {props.cloud.members.length}</Link>
            </h4>
            <div className="gallery-container">{images}</div>
        </div>
    );
};

export default withRouter<IProps>(CloudComponent);