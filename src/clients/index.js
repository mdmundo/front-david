import AppBar from "../common/AppBar";
import LoadTable from "./LoadTable";

const Clients = () => {
  return (
    <AppBar
      {...{ title: "Clientes", Component: <LoadTable />, isInitial: true }}
    />
  );
};

export { Clients as default };
