import AppBar from "../common/AppBar";
import LoadTable from "./LoadTable";

const Clients = ({ id }) => {
  return (
    <AppBar {...{ title: "Clientes", Component: <LoadTable {...{ id }} /> }} />
  );
};

export { Clients as default };
