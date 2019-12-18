import React, { Fragment } from "react"
import Items from "../items/Items"
import ItemForm from "../items/ItemForm"
import ItemFilter from "../items/ItemFilter"

import { Typography, Paper, Grid } from "@material-ui/core/"

const Home = () => {
  return (
    <Fragment>
      <ItemForm />
      <Items />
    </Fragment>
  )
}

export default Home
