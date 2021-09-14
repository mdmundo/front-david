import { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import storage from "localforage";
import { navigate } from "@reach/router";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Container from "@material-ui/core/Container";
import AppContext, { ThemeContext } from "../context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  table: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(7),
  },
}));

const LocalAppBar = ({ title, Component, isInitial, isLogin }) => {
  const { dispatchInstance, url } = useContext(AppContext);
  const { isDark, setDark } = useContext(ThemeContext);
  const classes = useStyles();

  return (
    <>
      <AppBar color="default">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.grow} />
          <Tooltip title="Voltar">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate(-1);
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Página Inicial">
            <IconButton
              color="inherit"
              disabled={isInitial}
              onClick={() => {
                navigate("/clients");
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={isDark ? "Claro" : "Escuro"}>
            <IconButton
              color="inherit"
              onClick={() => {
                setDark(!isDark);
              }}
            >
              {isDark ? <Brightness5Icon /> : <Brightness2Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sair">
            <IconButton
              edge="end"
              color="inherit"
              disabled={isLogin}
              onClick={() => {
                storage.removeItem("token").then(() => {
                  dispatchInstance(
                    axios.create({
                      baseURL: url,
                      headers: { Authorization: "Bearer Invalid" },
                    })
                  );
                  navigate("/");
                });
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container className={classes.table} maxWidth="md">
        {Component}
      </Container>
    </>
  );
};

export { LocalAppBar as default };
