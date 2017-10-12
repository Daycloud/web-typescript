import * as React from 'react';
import { Route, Switch } from 'react-router';

import { IInvitationDTO } from '../../lib/api/dto/InvitationDTO';

import RegisterFormContainer from '../../components/register/RegisterFormContainer';
import LoginFormContainer from '../../components/login/loginform/LoginFormContainer';
import JoinActionComponent from './joinactioncomponent/JoinActionComponent';

import './join.css';

interface IProps {
    invitation: IInvitationDTO;
    joinKey: string;
}

const JoinComponent = (props: IProps) => {

    return (
        <div className="center-horizontal">
            <div className="card column center m-t-l p-l">
                <h5 className="t-c">
                    {props.invitation.user.displayName} invited you to the cloud {props.invitation.cloud.name}.
                    <br/>To join, you need to sign in or register:
                </h5>
                <Switch>
                    <Route
                        path="*/login"
                        render={() => <LoginFormContainer registerRedirect={`/join/register?key=${props.joinKey}`}/>}
                    />
                    <Route
                        path="*/register"
                        render={() => <RegisterFormContainer loginRedirect={`/join/login?key=${props.joinKey}`} />}
                    />
                    <Route path="*" render={() => <JoinActionComponent joinKey={props.joinKey}/>} />
                </Switch>
            </div>
        </div>
    );
};

export default JoinComponent;