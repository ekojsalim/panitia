import React, { Component } from "react";

import { inject, observer } from "mobx-react";
import Link from "react-router-dom/Link";
import Grid from "@material-ui/core/Grid/Grid";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import List from "@material-ui/core/List/List";
import MarkEnter from '@material-ui/icons/TransitEnterexit';
import MarkExit from '@material-ui/icons/ExitToApp';
import DraftsIcon from '@material-ui/icons/Input';
import SendIcon from '@material-ui/icons/Info';
import Paper from "@material-ui/core/Paper/Paper";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Grid container alignItems={"center"} justify={"center"} style={{height:"100vh"}}>
          <Grid item>
            <Paper elevation={1}>
              <List
                component="nav"
                subheader={<ListSubheader component="div">Menu</ListSubheader>}
              >
                <ListItem button component={Link} to="/info">
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Check Ticket" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Register Ticket" />
                </ListItem>
                <ListItem button component={Link} to="/enter">
                  <ListItemIcon>
                    <MarkEnter />
                  </ListItemIcon>
                  <ListItemText inset primary="Mark Enter" />
                </ListItem>
                <ListItem button component={Link} to="/exit">
                  <ListItemIcon>
                    <MarkExit />
                  </ListItemIcon>
                  <ListItemText inset primary="Mark Exit" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default inject("authStore")(observer(Dashboard));