import React, { Fragment, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/auth/authContext"
import ItemContext from "../../context/item/itemContext"

import RepioLogo from "../../RepioLogo2.png"

const Navbar = ({ title, icon }) => {
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
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <ul>
        <Link to="/">
          <img alt="logo" src={RepioLogo} height="50px" width="50px" />
        </Link>
      </ul>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  )
}

export default Navbar
