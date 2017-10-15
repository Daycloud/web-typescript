import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IPublicUserDTO } from '../../../../lib/api/dto/UserDTO';

import './Members.css';

interface IProps {
    members: IPublicUserDTO[];
}

interface IRouteProps {
}

type Props = IProps & RouteComponentProps<IRouteProps>;

const MemberListComponent = (props: Props) => {

    const members = props.members.map((member: IPublicUserDTO) => {
        const imgSrc = member.fbId
            ? `http://graph.facebook.com/${member.fbId}/picture?width=500`
            : 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png';
        return (
            <div key={member._id} className="member-container">
                <img className="img-circle" src={imgSrc} />
                <h2>{member.displayName}</h2>
            </div>
        );
    });

    return (
        <div className="center-horizontal">
            <div className="w-90 t-c">
                <h1>
                    Guests
                </h1>
                <div className="members-container">{members}</div>
            </div>
        </div>
    );
};

export default withRouter<IProps>(MemberListComponent);