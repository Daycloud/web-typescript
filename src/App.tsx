import * as React from 'react';
import reducer from './redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'whatwg-fetch';

import Routes from './Routes';

import './App.scss';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

export default App;