import React, { useContext } from "react"
import PropTypes from "prop-types"
import ItemContext from "../../context/item/itemContext"
import IntervalContext from "../../context/interval/intervalContext"

const ItemItem = ({ item }) => {
  const itemContext = useContext(ItemContext)
  const intervalContext = useContext(IntervalContext)

  const { deleteItem, setCurrent, clearCurrent } = itemContext
  const { computeDays } = intervalContext

  const { _id, name, date, doneNum, interval, category } = item

  const onDelete = () => {
    deleteItem(_id)
    clearCurrent()
  }

  return (
    <div className="card bg-light">
      <ul className="list">{name && <li>{name}</li>}</ul>
      <ul className="list">{category && <li>{category}</li>}</ul>
      <ul className="list">{date && <li>{date}</li>}</ul>
      <ul className="list">{doneNum && <li>{doneNum}</li>}</ul>
      <ul className="list">{interval.label && <li>{interval.label}</li>}</ul>
      <ul className="list">{interval.value && <li>{interval.value}</li>}</ul>

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
