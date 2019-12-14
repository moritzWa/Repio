import React, { useState, useContext, useEffect } from "react"
import ItemContext from "../../context/item/itemContext"

const ItemForm = () => {
  const itemContext = useContext(ItemContext)

  const { addItem, updateItem, clearCurrent, current } = itemContext

  const defaultInterval = "Longterm"

  const empty = {
    name: "",
    date: null,
    doneNum: 0,
    interval: defaultInterval,
    category: "personal"
  }

  useEffect(() => {
    if (current !== null) {
      setItem(current)
    } else {
      setItem(empty)
    }
  }, [itemContext, current])

  const [item, setItem] = useState(empty)

  const { name, date, doneNum, interval, category } = item

  const onChange = e => setItem({ ...item, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addItem(item)
    } else {
      updateItem(item)
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  const formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [year, month, day].join("-")
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Item" : "Add Item"}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
      <input
        type="number"
        placeholder="Reviews done"
        name="doneNum"
        value={doneNum}
        onChange={onChange}
      />
      <input
        type="date"
        placeholder="Notes Made"
        name="date"
        value={formatDate(!date ? new Date() : date)}
        onChange={onChange}
      />
      <select name="interval" value={interval} onChange={onChange}>
        <option value="Longterm">Longterm</option>
        <option value="Shortterm">Shortterm</option>
      </select>
      <h5>Item category</h5>
      <input
        type="radio"
        name="category"
        value="personal"
        checked={category === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="category"
        value="professional"
        checked={category === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Item" : "Add Item"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  )
}

export default ItemForm
