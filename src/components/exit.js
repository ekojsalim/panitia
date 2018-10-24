import React, { Component } from "react";
import Scanner from "./scanner";
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import SnackbarMessage from "./snackbar";

class Exit extends Component {
  componentWillUnmount() {
    this.props.ticketStore.resetID();
  }
  render() {
    const { ticketStore, authStore } = this.props;
    return (
      <div style={{height: "100vh"}}>
        <Grid container alignItems="center" justify="center" style={{height: "100vh"}}>
          {
            ticketStore.ticketData && ticketStore.loaded ?
              <ExitMessage ticketStore={ticketStore} user={authStore.authUserEmail}/>:
              <Scanner/>
          }
        </Grid>
      </div>
    );
  }
}

class ExitMessage extends Component {
  state = {
    show: false,
    message: ""
  };

  handleMark = () => {
    if(this.props.ticketStore.ticketData.state === "Exited") {
      this.setState({show: true, message: "Ticket already entered before!"});
    }
    else {
      this.props.ticketStore.markExit(this.props.user);
      this.setState({show: true, message: "Ticket marked as entered!"});
    }
  };
  render() {
    return (
      <div>
        {this.state.show ? <SnackbarMessage message={this.state.message}/> : ""}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Mark Exit
            </Typography>
            <Typography>
              Ticket ID: {this.props.ticketStore.ticketID}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={this.handleMark}>Mark</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default inject("ticketStore", "authStore")(observer(Exit));