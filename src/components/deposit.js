import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
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
        openCamera: true,
        name: "",
        showOption: false,
        loading: false
    };

    onTakePhoto = async (dataUri) => {
        this.setState({ openCamera: false, loading: true});
        await this.props.depositStore.setDeposit(dataUri, this.props.ticketStore.ticketID, this.props.user);
        this.setState({loading: false});
    }

    render() {
        return (
            <div>
                {this.state.loading && <Loading />}
                {this.state.openCamera &&
                    <Card>
                        <CardActionArea>
                            <Camera
                                onTakePhoto={this.onTakePhoto}
                                imageType="jpg"
                                idealResolution={{
                                    width: 400,
                                    height: 400
                                }}
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
                {(!this.state.openCamera && !this.state.loading) &&
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Deposit success
                    </Typography>
                            <Typography>
                                Deposit ID: {this.props.ticketStore.ticketID}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" onClick={this.handleRegister}>Register</Button>
                        </CardActions>
                    </Card>
                }
            </div>
        );
    }
}

export default inject("depositStore", "authStore", "ticketStore")(observer(Register));