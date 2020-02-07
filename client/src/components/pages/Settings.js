import React, { Fragment, useState, useContext, useEffect } from "react"
import AuthContext from "../../context/auth/authContext"
import IntervalContext from "../../context/interval/intervalContext"

import { makeStyles } from "@material-ui/core"
import {
  Typography,
  TextField,
  Divider,
  Button,
  Box,
  Paper,
  Grid,
  Chip
} from "@material-ui/core/"

const Settings = () => {
  const useStyles = makeStyles({
    root: {
      backgroundColor: "#cfd8dc",
      height: "100vh"
    },
    FormPaper: {
      margin: "1rem",
      backgroundColor: "white",
      padding: "1.5rem",
      textAlign: "center",
      borderRadius: "10px"
    },
    formItem: {
      textAlign: "start",
      margin: "1rem"
    },
    divider: {
      margin: "15px"
    },
    dividerBig: {
      width: "100%",
      margin: "20px 0",
      padding: ".3px"
    },
    dividerSmall: {
      width: "80%",
      margin: "20px 20px",
      padding: ".2px"
    },
    chip: {
      margin: "4px"
    },
    saveButton: {
      marginLeft: "8px",
      margin: "1rem"
    }
  })

  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const intervalContext = useContext(IntervalContext)

  const { user, loadUser, addUserCat, deleteUserCat } = authContext
  const {
    intervals,
    getIntervals,
    addInterval,
    deleteInterval
  } = intervalContext

  useEffect(() => {
    loadUser()
    getIntervals()
    // eslint-disable-next-line
  }, [])

  const emptyCategory = {
    name: ""
  }
  const emptyInterval = {
    label: "",
    value: ""
  }

  const [category, setCategory] = useState(emptyCategory)
  const [interval, setInterval] = useState(emptyInterval)

  const { name } = category
  const { value, label } = interval

  const onChangeCategory = e =>
    setCategory({ ...category, [e.target.name]: e.target.value })

  const onSubmitCategory = e => {
    e.preventDefault()
    addUserCat(category)
    setCategory(emptyCategory)
  }

  const onChangeInterval = e =>
    setInterval({ ...interval, [e.target.name]: e.target.value })

  const onSubmitInterval = e => {
    e.preventDefault()
    addInterval(interval)
    setInterval(emptyInterval)
  }

  return (
    <Fragment>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid container justify="center" alignItems="center">
          <Grid item xs={11} sm={11} md={10} lg={6}>
            <Paper className={classes.FormPaper}>
              <Typography component="div">
                <Typography variant="h4" align="left" gutterBottom>
                  Settings
                </Typography>
                <Divider className={classes.dividerBig} />
                <Typography variant="h5" align="left" gutterBottom>
                  Categories
                </Typography>
                <Box ml={2}>
                  <Typography align="left" gutterBottom>
                    Create new Categroy
                  </Typography>
                  <form
                    onSubmit={onSubmitCategory}
                    className={classes.formItem}
                  >
                    <TextField
                      name="name"
                      className={classes.formItem}
                      value={name}
                      required
                      placeholder="i.e. Business"
                      onChange={onChangeCategory}
                    />
                    <Button
                      className={classes.saveButton}
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                  <Typography align="left" gutterBottom>
                    Your Categories
                  </Typography>

                  <div className={classes.formItem}>
                    {user !== null && user.categories.lenght !== 0 ? (
                      user.categories.map(cat => (
                        <Chip
                          key={cat !== undefined ? cat.name : "cant read prop"}
                          className={classes.chip}
                          label={
                            cat !== undefined ? cat.name : "cant read prop"
                          }
                          onDelete={() => deleteUserCat(cat)}
                        />
                      ))
                    ) : (
                      <p>no categories</p>
                    )}
                  </div>
                </Box>
                <Divider className={classes.dividerSmall} />
                <Typography variant="h5" align="left" gutterBottom>
                  Intervals
                </Typography>
                <Box ml={2}>
                  <Typography align="left" gutterBottom>
                    Create new Interval
                  </Typography>
                  <form
                    onSubmit={onSubmitInterval}
                    className={classes.formItem}
                  >
                    <TextField
                      name="label"
                      className={classes.formItem}
                      value={label}
                      required
                      placeholder="Pitch in 2 Weeks"
                      onChange={onChangeInterval}
                    />
                    <br />
                    <TextField
                      name="value"
                      className={classes.formItem}
                      value={value}
                      required
                      placeholder="ie 13-12-5-2-1"
                      onChange={onChangeInterval}
                    />
                    <Button
                      className={classes.saveButton}
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                  <Typography align="left" gutterBottom>
                    Your Intervals
                  </Typography>

                  <div className={classes.formItem}>
                    {intervals !== null && intervals.lenght !== 0 ? (
                      intervals.map(it => (
                        <Chip
                          key={it !== undefined ? it._id : "cant read prop"}
                          className={classes.chip}
                          label={
                            it !== undefined
                              ? `${it.label}: ${JSON.stringify(it.value)
                                  .replace(/[[\]]/g, " ")
                                  .replace(/,/g, "-")}`
                              : "cant read prop"
                          }
                          onDelete={() => deleteInterval(it._id)}
                        />
                      ))
                    ) : (
                      <p>no categories</p>
                    )}
                  </div>
                </Box>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Settings
