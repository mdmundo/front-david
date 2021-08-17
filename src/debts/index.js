import React from "react";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  }
}));

const Debts = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Débitos
        </Typography>
        <div className={classes.grow} />
        <IconButton color="inherit">
          <SettingsBrightnessIcon />
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={3} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          // onClick={() => {
          //   navigate(`/login`);
          // }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export { Debts as default };
