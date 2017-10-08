import * as React from 'react';

import Button from '../../../components/button/Button';
import { Link } from 'react-router-dom';

interface IProps {
    joinKey: string;
}

const JoinActionComponent = (props: IProps) => {

    return (

        <div style={{width: '100%'}}>
            <Button
                className="m-t-m"
                text="Continue with Facebook"
            />
            <Link
                to={`/join/login?key=${props.joinKey}`}
                style={{textDecoration: 'none'}}
            >
                <Button
                    className="m-t-m"
                    text="Continue with email"
                />
            </Link>

        </div>
    );
};

export default JoinActionComponent;