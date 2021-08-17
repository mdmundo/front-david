import React, { useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Login from "./login";
import Clients from "./clients";
import Debts from "./debts";

const App = () => {
  useEffect(() => {
    // if token was not found or else.
    // navigate("/clients");
    navigate("/clients");
  }, []);

  return (
    <Router>
      <Login path="login" />
      <Clients path="clients" />
      <Debts path="clients/:id" />
    </Router>
  );
};

export default App;
