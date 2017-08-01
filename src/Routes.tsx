import * as React from 'react';
import {Switch, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Routes = () => (
    <BrowserRouter basename="/">
        <div className="wrapper">
            <div className="wrapper-content panel">
                <Switch>
                    <Route component={EnsureLoggedInContainer}>
                        <Route path='/' component={Home}/>
                    </Route>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
);

export default Routes;