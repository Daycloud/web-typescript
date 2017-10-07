import * as React from 'react';

import { IInvitationDTO } from '../../lib/api/dto/InvitationDTO';

import './join.css';
import Button from '../../components/button/Button';

interface IProps {
    invitation?: IInvitationDTO;
    invitationError?: number;
}

interface IState {
    loadingFB: boolean;
}

class JoinComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            loadingFB: false
        };
    }

    render() {
        return (
            <div className="center-horizontal">
                <div className="card column center m-t-l p-l">
                    <h5>Vetle invited you to the cloud Bryllup</h5>
                    <Button
                        className="m-t-m"
                        text="Continue with Facebook"
                        loading={this.state.loadingFB}
                        onClick={() => {
                            this.setState({
                                loadingFB: true
                            });
                        }}
                    />
                    <Button className="m-t-m" text="Continue with email" loading={false} />
                </div>
            </div>
        );
    }
}

export default JoinComponent;