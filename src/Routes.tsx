import * as React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import EnsureLoggedInContainer  from './routes/ensurelogin/EnsureloginContainer';
import Home from './routes/home/Home';
import LoginContainer from './routes/login/LoginContainer';
import LoginRedirector from './routes/ensurelogin/LoginRedirector';

const Routes: React.StatelessComponent = () => (
    <BrowserRouter basename="/">
        <div className="wrapper">
            <LoginRedirector>
                <Switch>
                    <Route path="/login" exact={true} component={LoginContainer}/>
                    <EnsureLoggedInContainer>
                        <Route path="/" exact={true} component={Home} />
                    </EnsureLoggedInContainer>
                </Switch>
            </LoginRedirector>
        </div>
    </BrowserRouter>
);

export default Routes;