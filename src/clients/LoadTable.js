import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
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

  return axiosData ? (
    <Table data={axiosData.data} />
  ) : (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
};

export { LoadTable as default };
