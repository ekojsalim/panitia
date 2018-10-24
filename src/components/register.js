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

class Register extends Component {
  componentWillUnmount() {
    this.props.ticketStore.resetID();
  }
  render() {
    const { ticketStore, authStore } = this.props;
    return (
      <div style={{height: "100vh"}}>
        <Grid container alignItems="center" justify="center" style={{height: "100vh"}}>
          {
            ticketStore.ticketID ?
              <RegisterMessage ticketStore={ticketStore} user={authStore.authUserEmail}/>:
              <Scanner override={true}/>
          }
        </Grid>
      </div>
    );
  }
}

class RegisterMessage extends Component {
  state = {
    show: false,
    message: ""
  };

  handleRegister = () => {
    if(this.props.ticketStore.ticketData) {
      this.setState({show: true, message: "Ticket already registered before!"});
    }
    else {
      this.props.ticketStore.registerTicket(this.props.user);
      this.setState({show: true, message: "Ticket registered!"});
    }
  };
  render() {
    return (
      <div>
        {this.state.show ? <SnackbarMessage message={this.state.message}/> : ""}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Register Ticket
            </Typography>
            <Typography>
              Ticket ID: {this.props.ticketStore.ticketID}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={this.handleRegister}>Register</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default inject("ticketStore", "authStore")(observer(Register));