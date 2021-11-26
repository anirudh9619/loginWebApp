import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { getUser } from './Utils/common';

function App() {

  const user = getUser()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          {!user ? <NavLink exact activeClassName="active" to="/login">Login</NavLink> : <NavLink exact activeClassName="active" to="/home">Home</NavLink>}
        </div>
        <div className="content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
