import React, { Fragment } from "react"
import Items from "../items/Items"
import ItemForm from "../items/ItemForm"

const Home = () => {
  return (
    <Fragment>
      <ItemForm />
      <Items />
    </Fragment>
  )
}

export default Home
