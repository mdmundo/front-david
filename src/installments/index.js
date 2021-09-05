import AppBar from "../common/AppBar";
import LoadTable from "./LoadTable";

const Installments = ({ id }) => {
  return (
    <AppBar {...{ title: "Parcelas", Component: <LoadTable {...{ id }} /> }} />
  );
};

export { Installments as default };
