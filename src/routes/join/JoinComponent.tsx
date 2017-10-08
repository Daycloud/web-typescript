import * as React from 'react';

import { IInvitationDTO } from '../../lib/api/dto/InvitationDTO';

import Button from '../../components/button/Button';
import RegisterContainer from '../register/RegisterContainer';

import './join.css';
import LoginFormContainer from '../../components/login/loginform/LoginFormContainer';

interface IProps {
    invitation?: IInvitationDTO;
    invitationError?: number;
}

interface IState {
    loadingFB: boolean;
    showLogin: boolean;
    showRegister: boolean;
}

class JoinComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            loadingFB: false,
            showLogin: false,
            showRegister: false
        };
    }

    render() {

        const selectAction = (
            <div style={{width: '100%'}}>
                <Button
                    className="m-t-m"
                    text="Continue with Facebook"
                    loading={this.state.loadingFB}
                />
                <Button
                    className="m-t-m"
                    text="Continue with email"
                    loading={false}
                    onClick={() => {
                        this.setState({
                            showLogin: true
                        });
                    }}
                />
            </div>
        );

        return (
            <div className="center-horizontal">
                <div className="card column center m-t-l p-l">
                    <h5 className="t-c">Vetle invited you to the cloud Bryllup. <br/>To join, you need to sign in</h5>
                    {
                        this.state.showLogin
                        ? <LoginFormContainer />
                        : this.state.showRegister
                            ? <RegisterContainer />
                            : selectAction
                    }
                </div>
            </div>
        );
    }
}

export default JoinComponent;