import * as React from 'react';
import { doLogout } from '../../redux/login/duck';
import { IAppState } from '../../redux/index';
import { connect, Dispatch } from 'react-redux';

import './Navbar.css';
import {Link} from 'react-router-dom';

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
        <div className="center-horizontal navbar navbar-bg">
            <Link to="/" className="nav-link-logo">
                <img src={require('./daycloud_logo.png')} className="nav-logo" />
            </Link>
            <div style={{width: '150px', justifySelf: 'right'}}>
                <div className="nav-logout" onClick={props.logout}>Sign out</div>
            </div>
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
