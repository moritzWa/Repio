import React, { Fragment, useState, useContext, useEffect } from "react"
import AuthContext from "../../context/auth/authContext"
import IntarvalContext from "../../context/interval/intervalContext"

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
    }
  })

  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const intarvalContext = useContext(IntarvalContext)

  const { user, loadUser, addUserCat, deleteUserCat } = authContext
  const { intervals, getIntervals } = intarvalContext

  useEffect(() => {
    loadUser()
    getIntervals()
    // eslint-disable-next-line
  }, [])

  if (intervals !== null) {
    console.log(intervals)
  }

  const empty = {
    name: ""
  }

  const [category, setCategory] = useState(empty)

  const { name } = category

  const onChange = e =>
    setCategory({ ...category, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    addUserCat(category)
    setCategory(empty)
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
                  <Typography variant="h6" align="left" gutterBottom>
                    Create new Categroy
                  </Typography>
                  <form onSubmit={onSubmit} className={classes.formItem}>
                    <TextField
                      name="name"
                      className={classes.addCategoryFormInput}
                      value={name}
                      required
                      placeholder="i.e. Business"
                      onChange={onChange}
                    />
                    <Button
                      className={classes.saveButton}
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                  <Typography variant="h6" align="left" gutterBottom>
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
                  <Typography variant="h6" align="left" gutterBottom>
                    Create new Intarval
                  </Typography>
                  <form onSubmit={onSubmit} className={classes.formItem}>
                    <TextField
                      name="name"
                      className={classes.addCategoryFormInput}
                      value={name}
                      required
                      placeholder="i.e. Business"
                      onChange={onChange}
                    />
                    <Button
                      className={classes.saveButton}
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                  <Typography variant="h6" align="left" gutterBottom>
                    Your Categories
                  </Typography>

                  <div className={classes.formItem}>
                    {intervals !== null && intervals.lenght !== 0 ? (
                      intervals.map(it => (
                        <Chip
                          key={it !== undefined ? it._id : "cant read prop"}
                          className={classes.chip}
                          label={it !== undefined ? it.label : "cant read prop"}
                          onDelete={() => console.log("delete")}
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
