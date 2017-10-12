import * as React from 'react';

import Button from '../../components/button/Button';
import { doLogout } from '../../redux/login/duck';
import { IAppState } from '../../redux/index';
import { connect, Dispatch } from 'react-redux';

interface IProps {
}

interface IReduxProps {

}

interface IActionProps {
    logout: () => void;
}

type Props = IProps & IReduxProps & IActionProps;

const NavbarContainer = (props: Props) => {

    return (
        <div className="center-horizontal">
            <Button text="Sign out" onClick={props.logout}/>
        </div>
    );
};

const mapStateToProps = (appState: IAppState, props: Props): IReduxProps => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IActionProps => {
    return {
        logout: doLogout(dispatch)
    };
};

const connectedContainer = connect<IReduxProps, {}, IProps>(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarContainer);

export default connectedContainer;
