import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import axios from "./axios";
import Table from "./Table";

const LoadTable = () => {
  const [axiosData, setAxiosData] = useState();
  useEffect(() => {
    axios("/members")
      .then((clients) => {
        setAxiosData(clients);
      })
      .catch((e) => {
        console.debug(e);
      });
  }, []);

  return axiosData ? <Table data={axiosData.data} /> : <CircularProgress />;
};

export { LoadTable as default };
