import React, {Component} from "react";
import QrReader from "react-qr-reader";
import {inject, observer} from "mobx-react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {Redirect} from "react-router-dom";

const styles = {};

class Scanner extends Component {
  componentDidMount() {
    this.props.ticketStore.resetID();
  }

  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      toMenu: false
    };
  }

  handleScan = (data) => {
    if (data) {
      this.props.ticketStore.setID(data);
      console.log(data);
      this.setState({
        delay: false,
        toMenu: true
      });
    }
  };

  handleError(err) {
    console.error(err);
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{height: "100vh"}}>
        <Grid container alignItems="center" justify="center" style={{height: "100vh"}}>
          <Grid className={classes.scannerContainer} container justify={"center"} alignItems={"center"}>
            {this.state.toMenu && <Redirect to="/menu"/>}
            <Grid item xs={12} md={4}>
              <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                className={classes.scanner}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(inject("ticketStore")(observer(Scanner)));