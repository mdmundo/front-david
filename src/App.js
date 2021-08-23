import React, { useEffect, useReducer } from "react";
import { Router, navigate } from "@reach/router";
import axios from "axios";
import storage from "localforage";
import Login from "./login";
import Clients from "./clients";
import Debts from "./debts";
import Auth from "./auth";
import AppContext from "./context";

const update = (state, update) => update;
const url = "https://0l5ox8r4.anyfiddle.run";

const App = () => {
  const [instance, dispatchInstance] = useReducer(update);

  useEffect(() => {
    storage.getItem("token").then((token) => {
      if (token) {
        dispatchInstance(
          axios.create({
            baseURL: url,
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        navigate("/clients");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ axios: instance, dispatchInstance, url }}>
      <Router>
        <Login path="login" />
        <Clients path="clients" />
        <Debts path="clients/:id" />
        <Auth path="auth" />
      </Router>
    </AppContext.Provider>
  );
};

export default App;
