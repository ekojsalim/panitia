import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { inject, observer } from "mobx-react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import { Link, Redirect } from "react-router-dom";

const styles = {

};

class NotRegisteredDialog extends Component {
    open = true;
    handleClose = () => {
        this.open = false;
        this.props.ticketStore.resetID();
    };

    render() {
        return (
            <Dialog
                open={this.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Ticket Unregistered!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ticket not registered. Please direct the ticket holder to the registration area.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" component={Link} to="/dashboard">
                        Go to Menu
          </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Rescan
          </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            toMenu: false
        };
    }
    handleScan = (data) => {
        if (data) {
            this.props.ticketStore.loadTicket(data);
            console.log(data);
            this.setState({
                delay: false,
                toMenu: true
            });
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        const { classes } = this.props;
        let CameraStyle = {};
        if (!this.props.show) {
            CameraStyle.visibility = "hidden";
            CameraStyle.width = 0;
            CameraStyle.width = 0;
        }
        return (
            <Grid className={classes.scannerContainer} container justify={"center"} alignItems={"center"} style={CameraStyle}>
            {this.state.toMenu && <Redirect to="/menu" />}
                <Grid item xs={12} md={4}>
                    (<QrReader
                        style={CameraStyle}
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        className={classes.scanner}
                    />)
        </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(inject("ticketStore")(observer(Scanner)));