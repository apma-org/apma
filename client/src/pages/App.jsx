import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { About } from "./About";
import { Login } from "./Login";
import { Properties } from "./Properties";
import { Property } from "./Property";
import { SignUp } from "./SignUp";
import { Unit } from "./Unit";

import axios from "axios";

const App = () => {
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    const res = await axios.get(`/api/`);
    console.log(res.data);
    setMessage(res.data);
  };

  useEffect(() => {
    (async () => {
      await getMessage();
    })();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Header title={`APMA`} />
      <BrowserRouter>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/header" component={Header} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/property" component={Property} />
          <Route path="/properties" component={Properties} />
          <Route path="/unit" component={Unit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
