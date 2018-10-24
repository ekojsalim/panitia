import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  centeredProgressContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
};

class Loading extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.centeredProgressContainer}>
        <CircularProgress/>
      </div>
    );
  }
}

export default withStyles(styles)(Loading);