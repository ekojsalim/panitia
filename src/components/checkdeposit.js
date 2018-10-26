import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Typography, Avatar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from "./loading";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import SnackbarMessage from "./snackbar";


const styles = {
  card: {
    minWidth: 275,
    marginBottom: 10,
    marginTop: 20
  }
};

class InfoMessage extends Component {
  state = {
    loading: false,
    message: "",
    show: false
  };
  handleWithdraw = async () => {
    this.setState({loading: true})
    await this.props.depositStore.withdraw(this.props.depositStore.currentDeposit.id, this.props.user);
    this.setState({loading: false, show: true, message: "Item withdrawed!"})
  };

  render() {
    const {ticketStore, depositStore} = this.props;
    const currentDeposit = depositStore.depositData[0];
    return (
      <div>
        {this.state.loading ?
          <Loading/>
          :
          <Grid item>
            {this.state.show ? <SnackbarMessage message={this.state.message}/> : ""}
            <Grid container alignItems="center" justify="center">
              <Grid item>
                {ticketStore.ticketData ?
                  <img src={currentDeposit.data.imageUrl} style={{width: "100%", height: "100%"}}/> :
                  <Avatar style={{width: "100px", height: "100px"}}>?</Avatar>
                }
              </Grid>
            </Grid>
            <Card className={this.props.classes.card}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Current Deposit
                </Typography>
                <Typography variant="body1">
                  Deposit ID: {currentDeposit.id}
                </Typography>
                <Typography variant="body1">
                  Owner: {currentDeposit.data.owner}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {currentDeposit.data.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={this.handleWithdraw} disabled={currentDeposit.data.status === "Withdrawed"} color="primary">Withdraw</Button>
              </CardActions>
            </Card>
            {
              currentDeposit.data.events.map((e, i) => {
                console.log(e.timestamp.toDate());
                return (
                  <ExpansionPanel key={i}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography>{e.event}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        by {e.by} {moment(e.timestamp.toDate()).fromNow()}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })
            }
          </Grid>
        }
      </div>
    )
      ;
  }
}

const StyledInfoMessage = withStyles(styles)(InfoMessage);

class Info extends Component {
  componentDidMount() {
    this.props.depositStore.load(this.props.ticketStore.ticketID);
  }

  render() {
    const {ticketStore, depositStore} = this.props;
    return (
      <div style={{height: "100vh"}}>
        <Grid container alignItems="center" justify="center" style={{height: "100vh"}}>
          {
            depositStore.depositData && depositStore.loaded ?
              <StyledInfoMessage ticketStore={ticketStore} depositStore={depositStore}
                                 user={this.props.authStore.authUserEmail}/> :
              <Loading/>
          }
        </Grid>
      </div>
    );
  }
}

export default inject("depositStore", "ticketStore", "authStore")(observer(Info));