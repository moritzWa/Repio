import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import AlertContext from "../../context/alert/alertContext"
import AuthContext from "../../context/auth/authContext"
import { Grid, TextField, Paper, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const Register = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }

    if (error === "User already exists") {
      setAlert(error, "danger")
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const { name, email, password, password2 } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger")
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger")
    } else {
      register({
        name,
        email,
        password
      })
    }
  }

  useEffect(() => {
    if (error !== null && error !== undefined) {
      alert(error)
    }
  }, [error])

  const useStyles = makeStyles({
    root: {
      height: "100vh",
      backgroundColor: "#cfd8dc"
    },
    FormPaper: {
      marginTop: "5rem",

      margin: "2rem",
      backgroundColor: "white",
      padding: "2rem",
      textAlign: "center",
      borderRadius: "20px"
    },
    FormItem: {
      margin: "10px"
    },
    LoginHeader: {
      margin: "2rem"
    }
  })
  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="flex start"
    >
      <Grid item xs={10} sm={8} md={4} lg={3}>
        <Paper className={classes.FormPaper}>
          <Typography className={classes.LoginHeader} variant="h4">
            Sign up now
          </Typography>

          <form onSubmit={onSubmit} className={classes.Form}>
            <TextField
              className={classes.FormItem}
              placeholder="Name"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <br />
            <TextField
              className={classes.FormItem}
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <br />
            <TextField
              className={classes.FormItem}
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
            <br />
            <TextField
              className={classes.FormItem}
              placeholder="Confirm Password"
              id="password2"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
            />
            <br />

            <Button
              className={classes.FormItem}
              variant="contained"
              color="grey"
              component={Link}
              to={"/login"}
            >
              Login
            </Button>
            <Button
              className={classes.FormItem}
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Acc
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Register
