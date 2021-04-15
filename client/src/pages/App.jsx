import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { About } from './About';
import "../styles/App.css";
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
      <NavBar/>
      <Header />
      <BrowserRouter>
            {/* <UserContext.Provider value={{ user, userData }}> */}
              {/* <Navbar logoutHandler={handleLogout} /> */}
              
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/header" component={Header} />
                {/* <Route path="/" component={Home} />  */}
              </Switch>
              {/* <Footer /> */}
            {/* </UserContext.Provider> */}
          </BrowserRouter>
    </div>
  );
};

export default App;
