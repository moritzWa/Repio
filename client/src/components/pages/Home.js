import React from "react"
import Items from "../items/Items"
import ItemForm from "../items/ItemForm"
import ItemFilter from "../items/ItemFilter"

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ItemForm />
      </div>
      <div>
        <ItemFilter />
        <Items />
      </div>
    </div>
  )
}

export default Home
