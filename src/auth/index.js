import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { navigate, useLocation } from "@reach/router";
import { parse } from "query-string";
import localforage from "localforage";

const useStyles = makeStyles((theme) => ({
  loading: {
    paddingTop: theme.spacing(10),
  },
}));

const Auth = () => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    const searchQueries = parse(location.search);
    localforage.setItem("token", searchQueries.id_token).then((_) => {
      navigate("/clients");
    });
  }, []);

  return (
    <Grid
      className={classes.loading}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export { Auth as default };
