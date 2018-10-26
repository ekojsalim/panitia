import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import CardActionArea from '@material-ui/core/CardActionArea';
import Loading from "./loading";
import {Link, Redirect} from "react-router-dom";
import SnackbarMessage from "./snackbar";

class Register extends Component {
  render() {
    const {ticketStore, authStore} = this.props;
    return (
      <div style={{height: "100vh"}}>
        <Grid container alignItems="center" justify="center" style={{height: "100vh"}}>
          {
            ticketStore.ticketID &&
            <RegisterMessage ticketStore={ticketStore} user={authStore.authUserEmail}
                             depositStore={this.props.depositStore}/>
          }
        </Grid>
      </div>
    );
  }
}

class RegisterMessage extends Component {
  componentDidMount() {
    this.props.depositStore.load(this.props.ticketStore.ticketID).then(() => {
      if(this.props.depositStore.depositData) this.setState({openCamera: false, hide: true, show: true, message: "This ticket holder has deposited before!"});
    });
  }
  state = {
    show: false,
    message: "",
    openNameDialog: false,
    openCamera: true,
    name: "",
    showOption: false,
    loading: false,
    hide: false
  };

  onTakePhoto = async (dataUri) => {
    if(!this.props.depositStore.depositData) {
      this.setState({openCamera: false, loading: true});
      await this.props.depositStore.setDeposit(dataUri, this.props.ticketStore.ticketID, this.props.user);
      this.setState({loading: false});
    }
    else {
      this.setState({openCamera: false, hide: true, show: true, message: "This ticket holder has deposited before!"})
    }
  };

  render() {
    return (
      <div>
        {this.state.loading && <Loading/>}
        {this.state.show ? <div> <SnackbarMessage message={this.state.message}/> <Redirect to="/menu" /></div>: ""}
        {this.state.openCamera &&
        <Card>
          <CardActionArea>
            <Camera
              onTakePhoto={this.onTakePhoto}
              imageType="jpg"
              sizeFactor={0.5}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Take a photo
              </Typography>
              <Typography component="p">
                Please take a picture of the things to deposit.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>}
        {(!this.state.openCamera && this.props.depositStore.loaded && !this.state.hide) &&
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Deposit success
            </Typography>
            <Typography>
              Deposit ID: {this.props.depositStore.currentDeposit.id}
            </Typography>
            <Typography>
              Please put the things to bag number {this.props.depositStore.currentDeposit.data.bagNumber}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" component={Link} to="/menu">Menu</Button>
          </CardActions>
        </Card>
        }
      </div>
    );
  }
}

export default inject("depositStore", "authStore", "ticketStore")(observer(Register));