import { useEffect, useState, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Table from "./Table";
import AppContext from "../context";
import { navigate } from "@reach/router";

const LoadTable = () => {
  const [axiosData, setAxiosData] = useState();
  const [error, setError] = useState(false);
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
          setError(true);
          setOpen(true);
        });
    }
  }, []);

  return axiosData ? (
    <Table data={axiosData.data} />
  ) : (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {error ? (
          <Typography variant="h1">😭</Typography>
        ) : (
          <CircularProgress />
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={2000}
        message="Ocorreu um erro. Não foi possível acessar os dados."
      />
    </>
  );
};

export { LoadTable as default };
