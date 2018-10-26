import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import SnackbarMessage from "./snackbar";
import Loading from "./loading";
import { Redirect } from "react-router-dom";

class Enter extends Component {
  render() {
    const { ticketStore, authStore } = this.props;
    return (
      <div style={{ height: "100vh" }}>
        <Grid container alignItems="center" justify="center" style={{ height: "100vh" }}>
          {
            ticketStore.ticketData && ticketStore.loaded ?
              <EnterMessage ticketStore={ticketStore} user={authStore.authUserEmail}/> :
              <Loading />
          }
          {
            !ticketStore.ticketID &&
            <Redirect to="/scanner" /> 
          }
        </Grid>
      </div>
    );
  }
}

class EnterMessage extends Component {
  state = {
    show: false,
    message: ""
  };

  handleMark = () => {
    if (this.props.ticketStore.ticketData.state === "Entered") {
      this.setState({ show: true, message: "Ticket already entered before!" });
    }
    else {
      this.props.ticketStore.markEnter(this.props.user);
      this.setState({ show: true, message: "Ticket marked as entered!" });
    }
  };
  render() {
    return (
      <div>
        {this.state.show ? <SnackbarMessage message={this.state.message} /> : ""}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Mark Enter
            </Typography>
            <Typography>
              Ticket ID: {this.props.ticketStore.ticketID}
            </Typography>
            <Typography>
              Name: {this.props.ticketStore.ticketData.name}
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

export default inject("ticketStore", "authStore")(observer(Enter));