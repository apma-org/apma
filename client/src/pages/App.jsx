import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { About } from "./About";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Properties } from "./Properties";
import { Property } from "./Property";
import { NewProperty } from "./NewProperty";
import { Unit } from "./Unit";
import { TenantHome } from "./TenantHome";
import { NewUnit } from "./NewUnit";
import { NewMaintenance } from "./NewMaintenance";

const App = () => {
  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Header title={`APMA`} />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/header" component={Header} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/tenantHome" component={TenantHome} />
          <Route path="/properties" component={Properties} />
          <Route path="/property/:pid" children={<Property />} />
          <Route path="/unit/:uid" children={<Unit />} />
          <Route path="/addProperty" component={NewProperty} />
          <Route path="/addUnit/:upid" children={<NewUnit />} />
          <Route path="/addMaintenance/:uid" children={<NewMaintenance />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
