import React, { useReducer, useState } from "react"
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
  CONTACT_ERROR,
  UPDATE_CONTACT_DONENUM,
  SORT_ITEMS
} from "../types"

const ItemState = props => {
  const initialState = {
    items: null,
    current: null,
    filtered: null,
    error: null,
    filteredItems: null
  }

  const [state, dispatch] = useReducer(itemReducer, initialState)

  // Get Items
  const getItems = async () => {
    try {
      console.log(await axios.get("/api/items"))
      //loggs data/items with 'interval: "Longterm" '

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
  console.log(state.items)

  const expandInfo = () => {
    // Expand item Information
    if (state.items !== null && state.items !== undefined) {
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
            // eslint-disable-next-line
            (r.isDone = i.doneNum >= r.Nr ? true : false),
            (r.date = addDays(i.date, r.distence))
          )
        )
      )
    }

    //get distence of overdo rep
    const createOverDoDays = item => {
      //tbd correct formular
      // Expected return after arrow function

      // eslint-disable-next-line
      let overDoReps = item.reps.filter(rep => {
        if (!rep.isDone && rep.date < new Date()) {
          return rep
        }
      })
      if (overDoReps.length > 0) {
        let overDoDays = Math.floor(
          (overDoReps[0].date - new Date()) / (1000 * 3600 * 24) + 1
        )
        return overDoDays
      } else return 0
    }

    if (state.items !== null) {
      state.items.map(i => (i.overDoDays = createOverDoDays(i)))
    }
  }

  if (state.items !== null && state.items !== undefined) {
    expandInfo()
  }

  //======================= API CRUD =========================//

  // Add Item
  const addItem = async item => {
    console.log("starting adding/posting")
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

  //could shorten this
  /* const setItemAsDone = item => {
    item.doneNum = Number(itemInProcess.doneNum) + 1
    itemInProcess.reps = createRepsData(item)
  } */

  // Increment DoneNum
  const incrementDoneNum = async item => {
    console.log("running incrementing in Item State", item)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.put(
        `/api/items/increment/${item._id}`,
        item,
        config
      )

      dispatch({
        type: UPDATE_CONTACT_DONENUM,
        payload: res.data
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

  //=============================== Sorting Locic =================================//

  //double logic could be shortened
  const compareValues = (key, order = "asc") => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0
      }
      let AProp
      let BProp
      if (a[key].label !== undefined) {
        console.log("labelsorting activated")
        AProp = a[key].label
        BProp = b[key].label
      } else if (a[key].name !== undefined) {
        console.log("categorysort activated")
        AProp = a[key].name
        BProp = b[key].name
      } else {
        AProp = a[key]
        BProp = b[key]
      }

      const varA = typeof AProp === "string" ? AProp.toUpperCase() : AProp
      const varB = typeof BProp === "string" ? BProp.toUpperCase() : BProp

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return order === "desc" ? comparison * -1 : comparison
    }
  }

  const [isAsc, setDirectionToggler] = useState(true)

  const sort = key => {
    //create direction variable
    let direction = isAsc ? "asc" : "desc"
    //change sorting
    let newOrder = state.items.sort(compareValues(key, direction))
    //toggle diricton
    setDirectionToggler(!isAsc)

    dispatch({ type: SORT_ITEMS, payload: newOrder })

    console.log(key, direction, newOrder)
    //state was updated
  }

  //======================= Filter for ToReview Locic =========================//

  //finnd item that has overdo reps
  const filterOverDoItems = items => {
    let filteredArray = []
    items.forEach(element => {
      element.reps.forEach(rep => {
        if (
          !rep.isDone &&
          rep.date < new Date() &&
          !filteredArray.includes(element)
        ) {
          filteredArray.push(element)
        }
      })
    })
    return filteredArray //returns items
  }

  if (state.items !== null && state.items !== undefined) {
    state.filteredItems = filterOverDoItems(state.items)
  }

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        filteredItems: state.filteredItems,
        addItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateItem,
        incrementDoneNum,
        filterItems,
        clearFilter,
        getItems,
        clearItems,
        sort
      }}
    >
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemState
