import React, { useState } from "react"
import {
  Paper,
  Divider,
  TextField,
  Chip,
  MenuItem,
  Button
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles({
  root: {
    borderRadius: 0,
    margin: "none",
    padding: "15px",
    border: "none"
  },
  settingArea: {
    maxWidth: "500px",
    borderRadius: 0,
    margin: "none",
    border: "none",
    boxShadow: "none"
  },
  settingItem: {
    padding: "10px",
    alignItems: "left"
  },
  menuItem: {
    fontWeight: "bold",
    padding: "15px 0"
  },
  menuSubItem: {
    fontSize: "14px",
    paddingBottom: "5px",
    fontWeight: "bolder",
    padding: "15px 0",
    color: "#4071BC"
  },
  label: {
    fontSize: "14px",
    display: "inline-block",
    padding: "15px 0px 10px 10px",
    minWidth: "230px",

    fontWeight: "regular"
  },
  FormItemSelect: {
    width: "100px"
  },
  settingTool: {
    display: "inline-block",
    maxWidth: "100px"
  },
  addCategoryForm: {
    minWidth: "200px",
    maxHeight: "40px"
  },
  addCategoryFormInput: { maxWidth: "110px", marginRight: "20px" },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    display: "inline-block"
  },
  chip: {
    margin: 2
  },
  divider: {
    margin: "15px"
  },
  dividerBig: {
    width: "100%",
    margin: "20px 0",
    padding: ".3px"
  },
  videoEmbed: {
    width: "100%",
    height: "275px"
  }
})
const About = () => {
  const classes = useStyles()

  return (
    <div>
      <h1>Repio</h1>
      <p className="my-1">Keep the knowledge you gained</p>
      <p className="my-1">Sales copy: TBD</p>

      <div className={classes.menuItem}>About</div>
      <div className={classes.label}>What is Spaced Repitition?</div>
      <div>video link turned of cuz of chrome dev tools warning</div>
      <iframe
        className={classes.videoEmbed}
        src="https://www.youtube.com/embed/cVf38y07cfk"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Spaced Repititon"
      ></iframe>
      <div className={classes.label}>
        <a
          href="https://en.wikipedia.org/wiki/Spaced_repetition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>
      </div>
      <button>Try it out now</button>
    </div>
  )
}

export default About
