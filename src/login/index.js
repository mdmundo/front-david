import { useContext } from "react";
import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import GoogleIcon from "./GoogleIcon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppContext from "../context";
import AppBar from "../common/AppBar";

const Login = () => {
  const { url } = useContext(AppContext);

  return (
    <AppBar
      {...{
        title: "Entrar",
        Component: (
          <Grid
            container
            spacing={10}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography component="h1" variant="h2">
                Entre com sua conta
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={() => {
                  navigate(`${url}/connect/google`);
                }}
              >
                Entrar com Google
              </Button>
            </Grid>
          </Grid>
        ),
      }}
    />
  );
};

export { Login as default };
