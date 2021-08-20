import React, { useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Login from "./login";
import Clients from "./clients";
import Debts from "./debts";
import Auth from "./auth";

const App = () => {
  useEffect(() => {
    // if token was not found or else.
    // navigate("/clients");
    // navigate("/login");
  }, []);

  return (
    <Router>
      <Login path="login" />
      <Clients path="clients" />
      <Debts path="clients/:id" />
      <Auth path="auth" />
    </Router>
  );
};

export default App;
