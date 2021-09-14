import Register from "./Register";
import Main from "./StepsMain";
import Debt from "./StepsDebt";

const RegisterMain = () =>
  Register({ title: "Cadastro de Cliente", Component: <Main /> });
const RegisterDebt = ({ id }) =>
  Register({ title: "Cadastro de Débito", Component: <Debt id={id} /> });

export { RegisterMain as default, RegisterDebt };
