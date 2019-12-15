import React, { Fragment } from "react"
import Items from "../items/Items"
import ItemForm from "../items/ItemForm"
import ItemFilter from "../items/ItemFilter"

import { Typography, Paper, Grid } from "@material-ui/core/"

const Home = () => {
  return (
    <Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
       <Grid item xs={11} md={10} lg={8}>
        <Paper>
          <ItemForm />
        </Paper>
        <ItemFilter />

      </Grid>
      </Grid>

        <Items />
    </Fragment>
  )
}

export default Home
