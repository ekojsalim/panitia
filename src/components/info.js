import React, { Component } from "react";
import Scanner from "./scanner";
import { inject, observer } from "mobx-react";
import { Typography } from "@material-ui/core";
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
    marginBottom: 10
  }
};

class InfoMessage extends Component {
  render() {
    return (
      <Grid item>
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
            <Typography variant="body1" gutterBottom>
              Image
            </Typography>
            <img src={this.props.ticketStore.ticketData.imageUrl} />
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
  componentWillUnmount() {
    this.props.ticketStore.resetID();
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
          <Scanner show={!ticketStore.loaded && !ticketStore.loading}/>
        </Grid>
      </div>
    );
  }
}

export default inject("ticketStore")(observer(Info));