import { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { navigate, useLocation } from "@reach/router";
import axios from "axios";
import AppContext from "../context";

const useStyles = makeStyles((theme) => ({
  loading: {
    paddingTop: theme.spacing(10),
  },
}));

const Auth = () => {
  const { dispatchInstance, url } = useContext(AppContext);
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    axios(`${url}/auth/google/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(({ data }) => {
        dispatchInstance(
          axios.create({
            baseURL: url,
            headers: { Authorization: `Bearer ${data.jwt}` },
          })
        );
      })
      .catch((e) => {
        console.debug(e);
      });

    navigate("/clients");
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
