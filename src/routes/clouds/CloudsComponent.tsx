import * as React from 'react';

import { ICloudDTO } from '../../lib/api/dto/CloudDTO';
import CloudComponent from './cloudlist/CloudListComponent';

import './Clouds.css';

interface IProps {
    clouds: ICloudDTO[];
}

const CloudsComponent = (props: IProps) => {

    const clouds = props.clouds.map(cloud => {
        return (
                <CloudComponent key={cloud._id} cloud={cloud}/>
        );
    });

    return (
        <div className="clouds-container">
            {clouds}
        </div>
    );
};

export default CloudsComponent;