import React, { useReducer } from "react"
import axios from "axios"
import ItemContext from "./itemContext"
import itemReducer from "./itemReducer"
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from "../types"

const ItemState = props => {
  const initialState = {
    items: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(itemReducer, initialState)

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get("/api/items")

      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Expand item Information
  if (state.items !== null) {
    //Interval info
    state.items.map(i =>
      i.interval === "Longterm"
        ? (i.interval = {
            value: [1, 7, 14, 28, 56, 112, 224, 448],
            label: "Longterm"
          })
        : (i.interval = {
            value: [1, 4, 7, 10, 14, 21, 28, 38],
            label: "Shortterm"
          })
    )

    //Reps info

    //setup structure logic
    const createRepsStructure = usedInterval => {
      let repsArrayStructure = []

      for (let i = 0; i < usedInterval.length; i++) {
        repsArrayStructure.push({ Nr: i + 1, distence: usedInterval[i] })
      }
      return repsArrayStructure
    }

    //setup addDays Logic
    const addDays = (date, days) => {
      let result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    //fill structure
    state.items.map(i => (i.reps = createRepsStructure(i.interval.value)))

    state.items.map(i =>
      i.reps.map(
        /* r =>
          (r = {
            ...r,
            isDone: i.doneNum >= r.Nr ? true : false,
            date: addDays(i.date, r.distence)
          }) */
        r => (
          (r.isDone = i.doneNum >= r.Nr ? true : false),
          (r.date = addDays(i.date, r.distence)),
          console.log(r.distence)
        )
      )
    )
  }

  console.log(state.items)

  // Add Item
  const addItem = async item => {
    //compute reps
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post("/api/items", item, config)

      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Delete Item
  const deleteItem = async id => {
    try {
      await axios.delete(`/api/items/${id}`)

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Update Item
  const updateItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config)

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Clear Items
  const clearItems = () => {
    dispatch({ type: CLEAR_CONTACTS })
  }

  // Set Current Item
  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item })
  }

  // Clear Current Item
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter Items
  const filterItems = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateItem,
        filterItems,
        clearFilter,
        getItems,
        clearItems
      }}
    >
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemState
