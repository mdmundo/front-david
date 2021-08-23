import AppBar from "../common/AppBar";
import LoadTable from "./LoadTable";

const Clients = () => {
  return <AppBar {...{ title: "Clientes", Component: <LoadTable /> }} />;
};

export { Clients as default };
