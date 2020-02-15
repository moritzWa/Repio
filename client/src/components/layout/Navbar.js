import React, { Fragment, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/auth/authContext"
import ItemContext from "../../context/item/itemContext"

//import RepioLogo from "../../RepioLogo2.png"

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import BookIcon from "@material-ui/icons/Book"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: 200,
    fontFamily: '"Helvetica Neue"'
  }
}))

const Navbar = ({ title, icon }) => {
  const classes = useStyles()

  const authContext = useContext(AuthContext)
  const itemContext = useContext(ItemContext)

  const { isAuthenticated, logout, user, loadUser } = authContext
  const { clearItems } = itemContext

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  const onLogout = () => {
    logout()
    clearItems()
  }

  const authLinks = (
    <Fragment>
      <Button component={Link} color="inherit" to={"/about"}>
        About
      </Button>
      <Button component={Link} color="inherit" to={"/settings"}>
        Settings
      </Button>
      <Typography variant="button" display="block">
        {`Hi ${user && user.name}`}
      </Typography>
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="logout"
        onClick={onLogout}
      >
        <ExitToAppIcon />
      </IconButton>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Button component={Link} color="inherit" to={"/about"}>
        About
      </Button>
      <Button component={Link} color="inherit" to={"/register"}>
        Register
      </Button>
      <Button component={Link} color="inherit" to={"/login"}>
        Login
      </Button>
    </Fragment>
  )

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="logo"
            component={Link}
            to={isAuthenticated ? "/dashboard" : "/"}
          >
            <BookIcon />
          </IconButton>

          <Typography variant="h4" className={classes.title}>
            Repio
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Navbar
