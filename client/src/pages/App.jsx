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
import { EditProperty } from "./EditProperty";
import { Unit } from "./Unit";
import { NewUnit } from "./NewUnit";
import { EditUnit } from "./EditUnit";
import UserContext from "../context/UserContext";

const App = () => {
  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, updateUser }}>
          <NavBar />
          <Header title={`APMA`} />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/header" component={Header} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp} />
            <Route path="/properties" component={Properties} />
            <Route path="/property/:pid" children={<Property />} />
            {/* <Route path="/properties/:propertyId" children={<Property />} /> */}
            <Route path="/addProperty" component={NewProperty} />
            <Route path="/editProperty" component={EditProperty} />
            <Route path="/addUnit" component={NewUnit} />
            <Route path="/editUnit" component={EditUnit} />
            <Route path="/unit" component={Unit} />
            {/* <Route path="/unit/:unitId" component={Unit} /> */}
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
