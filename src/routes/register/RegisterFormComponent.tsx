
import TextEntry from '../../components/textentry/TextEntry';
import * as React from 'react';
import Button from '../../components/button/Button';
import { IOwnProps, IReduxProps, IState } from './RegisterFormContainer';
import { Link } from 'react-router-dom';

interface IProps extends IState, IOwnProps, IReduxProps {
    onEmailChanged: (email: string) => void;
    onDisplayNameChanged: (displayName: string) => void;
    onPasswordChanged: (password: string) => void;
    onPasswordConfirmedChanged: (passwordConfirmed: string) => void;
    onRegisterClicked: () => void;
}

type Props = IProps;

const RegisterFormComponent = (props: Props) => {
    const registerError = () => {
        switch (props.registerError) {
            case 409:
                return (
                    <h5>Email already in use, <Link to={props.loginRedirect}>go to login?</Link></h5>
                );

            default:
                return null;

        }
    };
    return (
        <div className="center-horizontal w-100">
            <h1>Register</h1>
            {registerError()}
            <TextEntry
                name="email"
                label="Email"
                inputType="email"
                value={props.email}
                onChange={(e) => props.onEmailChanged(e.target.value)}
                showError={props.error.email}
            />
            <TextEntry
                name="displayName"
                label="Display name"
                inputType="text"
                value={props.displayName}
                onChange={(e) => props.onDisplayNameChanged(e.target.value)}
                showError={props.error.displayName}
            />
            <TextEntry
                name="password"
                label="Password"
                inputType="password"
                value={props.password}
                onChange={(e) => props.onPasswordChanged(e.target.value)}
                showError={props.error.password}
            />
            <TextEntry
                name="confirmPassword"
                label="Confirm password"
                inputType="password"
                value={props.passwordConfirmed}
                onChange={(e) => props.onPasswordConfirmedChanged(e.target.value)}
                showError={props.error.passwordConfirmed}
            />
            <Button
                className="button-s m-t-m"
                text="Register"
                loading={false}
                onClick={() => props.onRegisterClicked()}
            />
        </div>
    );
};

export default RegisterFormComponent;