import React, { useEffect, useReducer, useMemo } from "react";
import { Router, navigate } from "@reach/router";
import axios from "axios";
import storage from "localforage";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Login from "./login";
import Clients from "./clients";
import Debts from "./debts";
import Auth from "./auth";
import Register, { RegisterDebt } from "./register";
import Installments from "./installments";
import AppContext, { ThemeContext } from "./context";

const update = (state, update) => update;
const url = process.env.REACT_APP_API_URL || "https://0l5ox8r4.anyfiddle.run";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDark, setDark] = useReducer(update);

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
        navigate("/clients/19/new");
      }
    });
  }, []);

  useEffect(() => {
    setDark(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: isDark ? "dark" : "light",
          primary: {
            dark: "#1769aa",
            main: "#2196f3",
            light: "#4dabf5",
          },
        },
      }),
    [isDark]
  );

  return (
    <AppContext.Provider value={{ axios: instance, dispatchInstance, url }}>
      <ThemeContext.Provider value={{ isDark, setDark }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Login path="/" />
            <Clients path="clients" />
            <Debts path="clients/:id" />
            <Installments path="debts/:id" />
            <Auth path="auth" />
            <Register path="new" />
            <RegisterDebt path="clients/:id/new" />
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
