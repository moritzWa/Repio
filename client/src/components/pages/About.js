import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"

import CardMedia from "@material-ui/core/CardMedia"

import mockupMacbook from "./Macbookwhite.png"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  mockup1: {
    textAlign: "center",
    alignItems: "center",
  },
  mockup1text: {
    textAlign: "center",
    padding: "5rem",
  },
  text: {
    textAlign: "left",
    padding: "5rem",
  },
  videoexplaination: {
    textAlign: "center",
    maxHeight: "60%",
  },
  img: {
    position: "relative",
    maxWidth: "100%",
  },
}))

const About = () => {
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
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              No flashcards. Just reminders.
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Spaced repetition is an evidence-based learning technique that is
              usually performed with flashcards. Using this technique for more
              complex topics is not easy. Repio provides a simple tool to do so
              without flashcards.
            </Typography>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <Grid container justify="center" alignItems="center" xs={12}>
        <Grid
          item
          className={classes.videoexplaination}
          xs={10}
          sm={9}
          md={8}
          lg={6}
        >
          <CardMedia
            component="iframe"
            height="400"
            image="https://www.youtube.com/embed/cVf38y07cfk"
            title="spaced repetition explaination"
          />
        </Grid>
      </Grid>

      <Grid container justify="center" alignItems="center" xs={12}>
        <Grid item className={classes.text} xs={12} sm={6}>
          <Typography variant="body1">
            The notion that spaced repetition could be used for improving
            learning was first proposed in the book Psychology of Study by Prof.
            C. A. Mace in 1932: "Perhaps the most important discoveries are
            those which relate to the appropriate distribution of the periods of
            study...Acts of revision should be spaced in gradually increasing
            intervals, roughly intervals of one day, two days, four days, eight
            days, and so on."
          </Typography>
        </Grid>
        <Grid item className={classes.text} xs={12} sm={6}>
          <Typography variant="body1">
            Spaced repetition is typically studied through the use of memorizing
            facts. Traditionally speaking, it has not been applied to fields
            that required some manipulation or thought beyond simple
            factual/semantic information. A more recent study has shown that
            spaced repetition can benefit tasks such as solving math problems.
          </Typography>
        </Grid>
        <Grid item className={classes.mockup1} xs={12} sm={6}>
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
          Made with love in Berlin
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

export default About
