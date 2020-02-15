import React, { Fragment } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import LandingPage from "./components/pages/LandingPage"

import Settings from "./components/pages/Settings"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Alerts from "./components/layout/Alerts"
import PrivateRoute from "./components/routing/PrivateRoute"

import ItemState from "./context/item/ItemState"
import AuthState from "./context/auth/AuthState"
import IntervalState from "./context/interval/IntervalState"
import AlertState from "./context/alert/AlertState"
import setAuthToken from "./utils/setAuthToken"

import { Paper } from "@material-ui/core"
import "./App2.css"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <Paper>
      <AuthState>
        <ItemState>
          <IntervalState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={Home} />
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/about" component={About} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                  </Switch>
                </Fragment>
              </Router>
            </AlertState>
          </IntervalState>
        </ItemState>
      </AuthState>
    </Paper>
  )
}

export default App
