import React, { useContext } from "react"
import PropTypes from "prop-types"
import ItemContext from "../../context/item/itemContext"

const ItemItem = ({ item }) => {
  const itemContext = useContext(ItemContext)
  const { deleteItem, setCurrent, clearCurrent } = itemContext

  const { _id, name, date, doneNum, interval, category } = item

  const onDelete = () => {
    deleteItem(_id)
    clearCurrent()
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (category === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </h3>
      <ul className="list">{date && <li>{date}</li>}</ul>
      <ul className="list">{doneNum && <li>{doneNum}</li>}</ul>
      <ul className="list">{interval && <li>{interval}</li>}</ul>

      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(item)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  )
}

ItemItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default ItemItem
