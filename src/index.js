import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import store from "./redux/config/store";
import {Provider} from "react-redux";
import routes from "./routes";
import {syncHistoryWithStore} from "react-router-redux";
import 'styles/globals.scss';


const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);
