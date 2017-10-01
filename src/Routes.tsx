import * as React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import EnsureLoggedInContainer  from './routes/ensurelogin/EnsureloginContainer';
import Home from './routes/home/Home';
import LoginContainer from './routes/login/LoginContainer';

const Routes = () => (
    <BrowserRouter basename="/">
        <div className="wrapper">
            <div className="wrapper-content panel">
                <Switch>
                    <Route path="/login" exact={true} component={LoginContainer}/>
                    <Route component={EnsureLoggedInContainer}>
                        <Route path="/" exact={true} component={Home} />
                    </Route>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
);

export default Routes;