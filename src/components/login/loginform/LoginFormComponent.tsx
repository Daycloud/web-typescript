import * as React from 'react';

import TextEntry from '../../textentry/TextEntry';
import Button from '../../button/Button';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    showLoading: boolean;
    error?: number;
    registerRedirect: string;
    onLoginClicked: (email: string, password: string) => void;
}

interface IState {
    email: string;
    password: string;
}

type Props = IProps;
type State = IState;

class LoginFormComponent extends React.Component<Props, State> {

    err = (error?: number) => {
        switch (error) {
            case 401:
                return (
                <h5 className="t-c">
                    Wrong username or password. <Link to={'/resetpassword'}>Forgot your password?</Link>
                </h5>);

            case 422:
                return <div className="error t-c">Enter email and password</div>;

            default:
                return undefined;
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    render() {
        return (
            <div className="w-100">
                {this.err(this.props.error)}
                <TextEntry
                    name="email"
                    label="Email"
                    inputType="email"
                    value={this.state.email}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            email: evt.target.value
                        });
                    }}
                />
                <TextEntry
                    className="m-t-m"
                    name="password"
                    label="Password"
                    inputType="password"
                    value={this.state.password}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            password: evt.target.value
                        });
                    }}
                />
                <Button
                    className="button-s m-t-l bg-primary"
                    text="Sign in"
                    loading={this.props.showLoading}
                    onClick={() => this.props.onLoginClicked(this.state.email, this.state.password)}
                />
                <Link to={this.props.registerRedirect}>
                    <Button className="button-s m-t-s bg-transparent" text="New user?" />
                </Link>
            </div>
        );
    }
}

export default LoginFormComponent;