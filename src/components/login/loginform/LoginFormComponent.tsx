import * as React from 'react';

import TextEntry from '../../textentry/TextEntry';
import Button from '../../button/Button';

interface IProps {
    showLoading: boolean;
    error?: string;
    onLoginClicked: (username: string, password: string) => void;
}

const LoginFormComponent = (props: IProps) => {

    const onLoginClicked = () => {
        props.onLoginClicked('iversen332@gmail.com', 'pettedr');
    };

    return (
        <div>
            <h5 style={{color: 'red'}}>{props.error}</h5>
            <TextEntry name="email" label="Email" inputType="email"/>
            <TextEntry className="m-t-m" name="password" label="Password" inputType="password"/>
            <Button
                className="button-s m-t-l bg-primary"
                text="Sign in"
                loading={props.showLoading}
                onClick={() => onLoginClicked()}
            />
            <Button className="button-s m-t-s bg-transparent" text="New user?" />
        </div>
    );
};

export default LoginFormComponent;