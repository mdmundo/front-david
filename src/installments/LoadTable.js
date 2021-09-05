import { useEffect, useState, useContext } from "react";
import { navigate } from "@reach/router";

import Table from "./Table";
import AppContext from "../context";
import Error from "../common/Error";
import Loading from "../common/Loading";

const LoadTable = ({ id }) => {
  const [axiosData, setAxiosData] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { axios } = useContext(AppContext);

  useEffect(() => {
    if (!axios) {
      navigate("/");
    } else {
      axios(`/debts/${id}`)
        .then(({ data: debt }) => {
          return debt;
        })
        .then(({ installments }) => {
          setAxiosData(installments);
        })
        .catch((e) => {
          setError("Ocorreu um erro. Não foi possível acessar os dados.");
          setOpen(true);
        });
    }
  }, []);

  return axiosData ? (
    <Table data={axiosData} />
  ) : error ? (
    <Error {...{ error, open, setOpen }} />
  ) : (
    <Loading />
  );
};

export { LoadTable as default };
