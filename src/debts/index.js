import AppBar from "../common/AppBar";
import LoadTable from "./LoadTable";

const Debts = ({ id }) => {
  return (
    <AppBar {...{ title: "Débitos", Component: <LoadTable {...{ id }} /> }} />
  );
};

export { Debts as default };
