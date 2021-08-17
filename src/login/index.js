import { useState } from "react";
import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GoogleIcon from "./GoogleIcon";
import Snackbar from "@material-ui/core/Snackbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  upper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(10)
  },
  login: {
    marginTop: theme.spacing(7)
  }
}));

const Login = () => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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
              setError("Uma mensagem útil sobre o erro ocorrido.");
              setOpen(true);
              // navigate(`/clients`);
            }}
          >
            Entrar com Google
          </Button>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
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
