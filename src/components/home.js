import {Button, Drawer, Grid, Hidden, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import backgroundPic from "../images/back.jpg";
import logo from "../images/logo3.png";
import Link from "react-router-dom/Link";

const styles = {
  background: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${backgroundPic})`,
    height: "100vh",
    backgroundSize: "cover",
    display: "flex"
  },
  drawerPaper: {
    background: "#18191d",
    width: "15vw",
    position: "relative"
  },
  logoSpace: {
    background: "#141519",
    height: "16%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  drawerContent: {
    height: "84%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: "50%"
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    textAlign: "center"
  },
  container: {
    height: "100%"
  },
  headline: {
    fontSize: "4.5em",
    color: "white",
    fontWeight: 600,
    letterSpacing: ".25rem"
  },
  atrox: {
    color: "#de143c"
  },
  subtitle: {
    color: "white",
    fontSize: "1.8em",
    textAlign: "center",
    fontWeight: 200,
    letterSpacing: ".05rem"
  },
  subtitleMobile: {
    color: "white",
    fontSize: "1.5em",
    textAlign: "center",
    fontWeight: 200,
    letterSpacing: ".05rem"
  },
  moreButton: {
    color: "#f7d600",
    border: "1px solid #f7d600",
    borderRadius: "0",
    padding: "8px 40px",
    margin: "20px"
  },
  buttonContainer: {
    position: "absolute",
    right: "5%",
    bottom: "5%"
  },
  drawerNavButton: {
    color: "#ffffff",
    border: ".6px solid #47484c",
    borderRadius: "0",
    width: "70%",
    letterSpacing: "1em",
    padding: "12px"
  },
  navText: {
    marginRight: "-1em",
    fontSize: ".8em"
  }
};

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.logoSpace}>
              <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <div className={classes.drawerContent}>
            <Button
                  variant="outlined"
                  size="large"
                  className={classes.drawerNavButton}
                  disableRipple={true}
                >
                  <span className={classes.navText}>Home</span>
                </Button>
            </div>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <Hidden smDown>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.container}
            >
              <Grid item>
                <Typography variant="display4" className={classes.headline}>
                  ULTIMATE CUP <span className={classes.atrox}>ATROX</span>
                </Typography>
                <Typography variant="display1" className={classes.subtitle}>
                  AS FIERCE AS FIRE
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonContainer}>
              <Button
                variant="outlined"
                size="large"
                className={classes.moreButton}
                component={Link}
                to="/signup"
              >
                Register
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.container}
            >
              <Grid item>
                <Typography variant="display4" className={classes.headline}>
                  <span className={classes.atrox}>ATROX</span>
                </Typography>
                <Typography variant="display1" className={classes.subtitleMobile}>
                  AS FIERCE AS FIRE
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  className={classes.moreButton}
                  component={Link}
                  to="/signup"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Hidden>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
