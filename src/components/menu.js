import React, {Component} from "react";

import {inject, observer} from "mobx-react";
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
import ScannerIcon from '@material-ui/icons/Scanner';
import DashboardIcon from '@material-ui/icons/Menu';
import WithdrawIcon from "@material-ui/icons/AllOut";
import DepositIcon from "@material-ui/icons/AllInbox";
import Paper from "@material-ui/core/Paper/Paper";
import {Redirect} from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    const {ticketStore} = this.props;
    ticketStore.loadTicket(ticketStore.ticketID);
  }

  render() {
    const {ticketStore} = this.props;
    const notRegistered = !ticketStore.ticketData;
    const notLoaded = !ticketStore.loaded;
    return (
      <div>
        {!ticketStore.ticketID && <Redirect to="/scanner"/>}
        <Grid container alignItems={"center"} justify={"center"} style={{height: "100vh"}}>
          <Grid item>
            <Paper elevation={1}>
              <List
                component="nav"
                subheader={<ListSubheader component="div">Ticket ID: {ticketStore.ticketID}</ListSubheader>}
              >
                <ListItem button component={Link} to="/register" disabled={!notRegistered || notLoaded}>
                  <ListItemIcon>
                    <DraftsIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Register Ticket"/>
                </ListItem>
                <ListItem button component={Link} to="/info" disabled={notRegistered || notLoaded}>
                  <ListItemIcon>
                    <SendIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Check Ticket"/>
                </ListItem>
                <ListItem button component={Link} to="/enter" disabled={notRegistered || notLoaded}>
                  <ListItemIcon>
                    <MarkEnter/>
                  </ListItemIcon>
                  <ListItemText inset primary="Mark Enter"/>
                </ListItem>
                <ListItem button component={Link} to="/exit" disabled={notRegistered || notLoaded}>
                  <ListItemIcon>
                    <MarkExit/>
                  </ListItemIcon>
                  <ListItemText inset primary="Mark Exit"/>
                </ListItem>
                <ListItem button component={Link} to="/checkdeposit" disabled={notRegistered || notLoaded}>
                  <ListItemIcon>
                    <SendIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Check & Withdraw Deposit"/>
                </ListItem>
                <ListItem button component={Link} to="/deposit" disabled={notRegistered || notLoaded}>
                  <ListItemIcon>
                    <DepositIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Deposit Penitipan"/>
                </ListItem>
                <ListItem button component={Link} to="/scanner">
                  <ListItemIcon>
                    <ScannerIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Rescan"/>
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                  <ListItemIcon>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Dashboard"/>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default inject("ticketStore")(observer(Dashboard));