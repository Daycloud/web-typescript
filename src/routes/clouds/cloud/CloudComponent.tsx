import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ICloudDTO } from '../../../lib/api/dto/CloudDTO';
import { ICloudImageDTO } from '../../../lib/api/dto/CloudImageDTO';
import { apiBaseUrl } from '../../../lib/api/util/index';

import './Cloud.css';
import ImageContainer from "../../../components/image/ImageContainer";

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
            <h4>Images: {props.cloud.cloudImages.length} | Members: {props.cloud.members.length}</h4>
            <div className="gallery-container">{images}</div>
        </div>
    );
};

export default withRouter<IProps>(CloudComponent);