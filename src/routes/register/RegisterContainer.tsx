import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { RouteComponentProps, withRouter } from 'react-router';

import { IAppState } from '../../redux/index';
import TextEntry from '../../components/textentry/TextEntry';
import Button from '../../components/button/Button';

interface IOwnProps {

}

interface IReduxProps {

}

interface IActionProps {

}

interface IRouteProps {

}

interface IState {

}

type Props = IOwnProps & IReduxProps & IActionProps & RouteComponentProps<IRouteProps>;
type State = IState;

class LoginContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    render() {

        return (
            <div className="center-horizontal">
                <h1>Register</h1>
                <TextEntry name="email" label="Email" inputType="email"/>
                <TextEntry name="displayName" label="Display name" inputType="text"/>
                <TextEntry name="password" label="Password" inputType="password"/>
                <TextEntry name="confirmPassword" label="Confirm password" inputType="password"/>
                <Button text="Register" loading={false} />
            </div>
        );
    }
}

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {

    };
};

const connectedContainer = connect<IReduxProps, {}, Props>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

export default withRouter<IOwnProps>(connectedContainer);