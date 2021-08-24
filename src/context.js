import { createContext } from "react";

const AppContext = createContext();
const ThemeContext = createContext();
const FormContext = createContext();

export { AppContext as default, ThemeContext, FormContext };
