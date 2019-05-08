import React from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';
import AddLocation from './container/google_map/add-location';
import GoogleMap from './container/google_map/google-map';

import { applyMiddleware, createStore } from "redux";
import combineReducers from "./reducers/reducers";
import thunk from "redux-thunk";
import App from "./App";
const createHistory = require("history").createBrowserHistory;

const history = createHistory();
const middleware = routerMiddleware(history);

export default createHistory({ forceRefresh: true });

export const store = createStore(
    combineReducers,
    applyMiddleware(
        thunk,
        middleware
    )
);

// import registerServiceWorker from './registerServiceWorker';

const Rout = (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route exact path="/add-location" component={AddLocation}/>
        <Route path="/google-map" component={GoogleMap}/>
        <Route path="/mongo-example" component={App}/>
        <Redirect from="*" to="/add-location"/>
    </Switch>
</BrowserRouter>
    </Provider>
)
ReactDOM.render(Rout, document.getElementById('root'));
// registerServiceWorker();