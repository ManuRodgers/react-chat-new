// third party library
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// own code
import rootReducer from "./reducers/index";
import Login from "./container/login/Login";
import Register from "./container/register/Register";
import BossInfo from "./container/bossInfo/BossInfo";
import GeniusInfo from "./container/geniusInfo/GeniusInfo";
import AuthRouter from "./container/authRouter/AuthRouter";
import Dashboard from './container/dashboard/Dashboard'
import Chat from './container/chat/Chat'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/bossInfo" component={BossInfo} />
          <Route path="/geniusInfo" component={GeniusInfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
