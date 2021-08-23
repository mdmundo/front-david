import { useEffect, useState, useContext } from "react";
import Table from "./Table";
import AppContext from "../context";
import { navigate } from "@reach/router";
import Error from "../common/Error";
import Loading from "../common/Loading";

const LoadTable = () => {
  const [axiosData, setAxiosData] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { axios } = useContext(AppContext);

  useEffect(() => {
    if (!axios) {
      navigate("/");
    } else {
      axios("/members")
        .then((clients) => {
          setAxiosData(clients);
        })
        .catch((e) => {
          setError("Ocorreu um erro. Não foi possível acessar os dados.");
          setOpen(true);
        });
    }
  }, []);

  return axiosData ? (
    <Table data={axiosData.data} />
  ) : error ? (
    <Error {...{ error, open, setOpen }} />
  ) : (
    <Loading />
  );
};

export { LoadTable as default };
