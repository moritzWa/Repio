import React from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import LinkMui from "@material-ui/core/Link"

import { Link } from "react-router-dom"

import mockupMacbook from "./Macbookwhite.png"
import repioexplaination from "./repioexplaination.png"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <LinkMui color="inherit">Repio UG</LinkMui> {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  mockup1: {
    textAlign: "center",
    alignItems: "center"
  },
  pageitem: {
    textAlign: "center",
    padding: "5rem"
  },
  img: {
    position: "relative",
    maxWidth: "80Γ%"
  }
}))

const LandingPage = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              We help you remember to learn
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Create Reminders to apply spaced repetition to your learning
              material and stop the forgetting curve.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={"/about"}
                  >
                    Learn more
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={"/login"}
                  >
                    Signup for Free
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      <Grid item className={classes.pageitem} xs={12} sm={12}>
        <img
          src={repioexplaination}
          alt="Mockup of webapp"
          className={classes.img}
        ></img>
      </Grid>

      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
        xs={12}
      >
        <Grid item className={classes.pageitem} xs={12} sm={6}>
          <Typography>
            {" "}
            The most <b>simple</b> spaced repetition App you have ever seen.
            Completely detatched from the lessons, notes, videos{" "}
            <b>and other forms of knowledge</b> you want to learn.{" "}
          </Typography>
        </Grid>
        <Grid item className={classes.mockup1} xs={12} sm={6} padding="1rem">
          <img
            src={mockupMacbook}
            alt="Mockup of webapp"
            className={classes.img}
          ></img>
        </Grid>
      </Grid>
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Made with{" "}
          <span role="img" ariaLabel="heart">
            ❤️
          </span>{" "}
          in Berlin
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

export default LandingPage
