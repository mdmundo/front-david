import Register from "./Register";
import Main from "./StepsMain";
import Debt from "./StepsDebt";

const RegisterMain = () => Register({ steps: <Main /> });
const RegisterDebt = ({ id }) => Register({ steps: <Debt id={id} /> });

export { RegisterMain as default, RegisterDebt };
