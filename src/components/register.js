import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import SnackbarMessage from "./snackbar";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import CardActionArea from '@material-ui/core/CardActionArea';
import Slide from '@material-ui/core/Slide';
import Loading from "./loading";


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Register extends Component {
  render() {
    const { ticketStore, authStore } = this.props;
    return (
      <div style={{ height: "100vh" }}>
        <Grid container alignItems="center" justify="center" style={{ height: "100vh" }}>
          {
            ticketStore.ticketID &&
            <RegisterMessage ticketStore={ticketStore} user={authStore.authUserEmail} />
          }
        </Grid>
      </div>
    );
  }
}

class RegisterMessage extends Component {
  state = {
    show: false,
    message: "",
    openNameDialog: false,
    openCamera: false,
    name: "",
    showOption: false,
    loading: false
  };

  handleRegister = () => {
    if (this.props.ticketStore.ticketData) {
      this.setState({ show: true, message: "Ticket already registered before!" });
    }
    else {
      this.setState({ showOption: true });

    }
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleInput = () => {
    this.setState({loading: true, openNameDialog: false});
    this.props.ticketStore.registerTicket(this.props.user, this.state.name).then(() => {
      this.setState({ show: true, message: "Ticket registered!", openDialog: false, loading: false });
    });
  }

  handleChangeText = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  openCamera = () => {
    this.setState({ openCamera: true });
  }

  onTakePhoto = (dataUri) => {
    this.props.ticketStore.setImage(dataUri);
    this.setState({openNameDialog: true, openCamera: false});
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loading/>}
        {this.state.show && <SnackbarMessage message={this.state.message} />}
        {this.state.showOption && <ConfirmationDialog dialogText="Is this a general entrance or closing ticket?" button1Text="Yes" button2Text="No" button1Handler={this.handleInput} button2Handler={this.openCamera} />}
        {this.state.openCamera &&
          <Card>
            <CardActionArea>
              <Camera
                onTakePhoto={this.onTakePhoto}
                imageType="jpg"
                idealResolution={{
                  width: 200,
                  height: 200
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Take a photo
            </Typography>
                <Typography component="p">
                  Please take a picture of the participant.
            </Typography>
              </CardContent>
            </CardActionArea>
          </Card>}
        {(!this.state.openCamera && !this.state.loading) &&
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
        }
        <Dialog
          open={this.state.openNameDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Input Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the ticket holder's name, you can leave this empty if this is a general entrance ticket
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChangeText}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleInput} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class ConfirmationDialog extends Component {
  state = {
    open: true
  }
  handleCloseButton1 = () => {
    this.setState({ open: false })
    this.props.button1Handler();
  }
  handleCloseButton2 = () => {
    this.setState({ open: false });
    this.props.button2Handler();
  }
  render() {
    const { button1Text, button2Text, dialogText, dialogTitle } = this.props;
    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseButton1} color="primary">
            {button1Text}
          </Button>
          <Button onClick={this.handleCloseButton2} color="primary">
            {button2Text}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default inject("ticketStore", "authStore")(observer(Register));