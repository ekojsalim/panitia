import React, { Component } from "react";

import { inject, observer } from "mobx-react";
import Link from "react-router-dom/Link";
import Grid from "@material-ui/core/Grid/Grid";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import List from "@material-ui/core/List/List";
import ScannerIcon from '@material-ui/icons/Scanner';
import MarkExit from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import Paper from "@material-ui/core/Paper/Paper";

class Dashboard extends Component {
  logout = () => {
    this.props.authStore.logout();
  }
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
                <ListItem button component={Link} to="/scanner">
                  <ListItemIcon>
                    <ScannerIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Scan" />
                </ListItem>
                <ListItem button component={Link} to="/list">
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="List Penitipan" />
                </ListItem>
                <ListItem button onClick={this.logout} to="/exit">
                  <ListItemIcon>
                    <MarkExit />
                  </ListItemIcon>
                  <ListItemText inset primary="Logout" />
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