import React from "react";
import ReactDOM from "react-dom";
import {browserHistory} from "react-router";
import Routes from "./routes";
import store from "./redux/config/store";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import "./styles/globals.scss";

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Routes history={history}/>
    </Provider>,
    document.getElementById('app')
);
