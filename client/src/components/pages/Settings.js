import React, { Fragment, useContext, useEffect } from "react"
import AuthContext from "../../context/auth/authContext"

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
    }
  })

  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const { user, loadUser } = authContext

  const initiaCategories = [
    { id: 1, name: "Business" },
    { id: 2, name: "Technology" },
    { id: 2, name: "Culture" },
    { id: 2, name: "History" }
  ]

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  if (user !== null) {
    console.log(user.categories)
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
                  <form className={classes.formItem}>
                    <TextField
                      name="name"
                      className={classes.addCategoryFormInput}
                      //value={category.name}
                      required
                      placeholder="i.e. Business"
                      //onChange={handleInputChangeCategories}
                    />
                    <Button
                      className={classes.saveButton}
                      color="primary"
                      type="submit"
                      /* onClick={e => {
                        e.preventDefault()
                        props.addCategory(category)
                        setCategory(initialFormStateCategory)
                      }} */
                    >
                      Save
                    </Button>
                  </form>
                  <Typography variant="h6" align="left" gutterBottom>
                    Your Categories
                  </Typography>
                  <div className={classes.formItem}>
                    {initiaCategories.map(cat => (
                      <Chip
                        key={cat.name}
                        className={classes.chip}
                        label={cat.name}
                        //onDelete={() => props.deleteCategory(cat.id)}
                      />
                    ))}
                  </div>
                  <div className={classes.formItem}>
                    {user !== null ? (
                      (console.log(user),
                      user.categories.map(cat => (
                        <Chip
                          key={cat.name}
                          className={classes.chip}
                          label={cat.name}
                          //onDelete={() => props.deleteCategory(cat.id)}
                        />
                      )))
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
