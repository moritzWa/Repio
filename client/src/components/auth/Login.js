import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import AuthContext from "../../context/auth/authContext"
import AlertContext from "../../context/alert/alertContext"

import { Grid, TextField, Paper, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const Login = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard")
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger")
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger")
    } else {
      login({
        email,
        password
      })
    }
  }

  const useStyles = makeStyles({
    root: {
      height: "94.5vh",
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
      alignItems="flex-start"
    >
      <Grid item xs={10} sm={8} md={4} lg={3}>
        <Paper className={classes.FormPaper}>
          <Typography className={classes.LoginHeader} variant="h4">
            Account Login
          </Typography>

          <form onSubmit={onSubmit} className={classes.Form}>
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
            />
            <br />

            <Button
              className={classes.FormItem}
              variant="contained"
              component={Link}
              to={"/register"}
            >
              Sign up
            </Button>
            <Button
              className={classes.FormItem}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
