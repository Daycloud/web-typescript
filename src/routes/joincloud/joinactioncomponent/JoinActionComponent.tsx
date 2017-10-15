import * as React from 'react';
import { Link } from 'react-router-dom';

import FacebookButton from '../../../components/login/facebookbutton/FacebookButtonComponent';

interface IProps {
    joinKey: string;
}

const JoinActionComponent = (props: IProps) => {

    return (

        <div style={{width: '100%'}}>
            <FacebookButton />
            <Link
                to={`/join/login?key=${props.joinKey}`}
                style={{textDecoration: 'none'}}
            >
                <h5
                    className="m-t-l t-c"
                >
                    Continue with email
                </h5>
            </Link>

        </div>
    );
};

export default JoinActionComponent;