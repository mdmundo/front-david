import { useState, useContext } from "react";
import { navigate } from "@reach/router";
import storage from "localforage";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GoogleIcon from "./GoogleIcon";
import Snackbar from "@material-ui/core/Snackbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppContext from "../context";

const useStyles = makeStyles((theme) => ({
  upper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(10),
  },
  login: {
    marginTop: theme.spacing(7),
  },
}));

const Login = () => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { url } = useContext(AppContext);

  const classes = useStyles();

  return (
    <>
      <Container component="main" className={classes.main} maxWidth="sm">
        <div className={classes.upper}>
          <Typography component="h1" variant="h2">
            Entre com sua conta
          </Typography>
          <Button
            className={classes.login}
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={() => {
              // setError("Uma mensagem útil sobre o erro ocorrido.");
              // setOpen(true);
              storage.setItem(
                "token",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5Njc1MDk0LCJleHAiOjE2MzIyNjcwOTR9.YunBgSV1QJ5DP0-N6AVHFsKu5AzoyMmKvOfYS8gLZNA"
              );
              navigate(`${url}/connect/google`);
            }}
          >
            Entrar com Google
          </Button>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={750}
        message={error || "An error occurred."}
      />
    </>
  );
};

export { Login as default };
