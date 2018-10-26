import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Typography, Avatar } from "@material-ui/core";
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


const styles = {
  card: {
    minWidth: 275,
    marginBottom: 10,
    marginTop: 20
  }
};

class InfoMessage extends Component {
  render() {
    const { ticketStore } = this.props;
    return (
      <Grid item>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            {ticketStore.ticketData ?
              <Avatar src={this.props.ticketStore.ticketData.imageUrl} style={{width: "100%", height: "100%"}}/> :
              <Avatar style={{width: "100px", height: "100px"}}>?</Avatar>
            }
          </Grid>
        </Grid>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Ticket Info
            </Typography>
            <Typography variant="body1">
              Ticket ID: {this.props.ticketStore.ticketID}
            </Typography>
            <Typography variant="body1">
              Name: {this.props.ticketStore.ticketData.name ? this.props.ticketStore.ticketData.name : "No name"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Status: {this.props.ticketStore.ticketData.state}
            </Typography>
          </CardContent>
        </Card>
        {
          this.props.ticketStore.ticketData.events.map((e, i) => {
            return (
              <ExpansionPanel key={i}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{e.event}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    by {e.by} {moment(e).fromNow()}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </Grid>
    );
  }
}

const StyledInfoMessage = withStyles(styles)(InfoMessage);

class Info extends Component {
  componentDidMount() {
    this.props.ticketStore.loadTicket(this.props.ticketStore.ticketID);
  }
  render() {
    const { ticketStore } = this.props;
    return (
      <div style={{ height: "100vh" }}>
        <Grid container alignItems="center" justify="center" style={{ height: "100vh" }}>
          {
            ticketStore.ticketData && ticketStore.loaded ?
              <StyledInfoMessage ticketStore={ticketStore} /> :
              <Loading />
          }
        </Grid>
      </div>
    );
  }
}

export default inject("ticketStore")(observer(Info));