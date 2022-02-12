import React from 'react';
import ReactDom from 'react-dom';

import {Provider} from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import { Link } from "react-router-dom";


import App from './App';
import {BrowserRouter} from "react-router-dom";

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
