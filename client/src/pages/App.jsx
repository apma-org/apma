import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { About } from "./About";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Properties } from "./Properties";
import { Property } from "./Property";
import { Unit } from "./Unit";
import { TenantHome } from "./TenantHome";
import UserContext from "../context/UserContext";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const updateUserId = (userId) => setUserId(userId);
  const updateUserType = (userType) => setUserType(userType);
  const updateUserName = (userName) => setUserName(userName);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            userId,
            userType,
            userName,
            updateUserId,
            updateUserType,
            updateUserName,
          }}
        >
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
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
