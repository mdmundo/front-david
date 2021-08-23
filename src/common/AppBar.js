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
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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

const LocalAppBar = ({ title, Component }) => {
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
          <Tooltip title={isDark ? "Claridade" : "Escuridão"}>
            <IconButton
              color="inherit"
              onClick={() => {
                setDark(!isDark);
              }}
            >
              {isDark ? <Brightness5Icon /> : <Brightness2Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notificações">
            <IconButton color="inherit" disabled>
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Sair">
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                storage.removeItem("token").then(() => {
                  dispatchInstance(
                    axios.create({
                      baseURL: url,
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