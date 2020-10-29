import React, { useReducer, useState } from "react"
import axios from "axios"
import ItemContext from "./itemContext"
import itemReducer from "./itemReducer"
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  UPDATE_ITEM_DONE_NUM,
  SORT_ITEMS,
} from "../types"

const ItemState = (props) => {
  const initialState = {
    items: null,
    currentItem: null,
    filtered: null,
    error: null,
    filteredItems: null,
  }

  const [state, dispatch] = useReducer(itemReducer, initialState)

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get("/api/items")

      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const expandInfo = () => {
    // Expand item Information
    if (state.items !== null && state.items !== undefined) {
      //Interval default info
      state.items.map((i) =>
        i.interval === "Longterm"
          ? (i.interval = {
            value: [1, 7, 14, 28, 56, 112, 224, 448],
            label: "Longterm",
          })
          : (i.interval = {
            value: [1, 4, 7, 10, 14, 21, 28, 38],
            label: "Shortterm",
          })
      )

      //Reps info

      //setup structure logic
      const createRepsStructure = (usedInterval) => {
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

      //todo does not work if not both intervalRef.value and interval.value available

      state.items.map(
        (i) =>
          (i.reps = createRepsStructure(
            i.intervalRef.value || i.interval.value
          ))
      )

      state.items.map((i) =>
        i.reps.map(
          (r) => (
            // eslint-disable-next-line
            (r.isDone = i.doneNum >= r.Nr ? true : false),
            (r.date = addDays(i.date, r.distence))
          )
        )
      )
    }

    //get distence of overdo rep
    const createOverDoDays = (item) => {
      //tbd correct formular
      // Expected return after arrow function

      // eslint-disable-next-line
      let overDoReps = item.reps.filter((rep) => {
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
      state.items.map((i) => (i.overDoDays = createOverDoDays(i)))
    }
  }

  if (state.items !== null && state.items !== undefined) {
    expandInfo()
  }

  //======================= API CRUD =========================//

  const addItem = async (item) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const res = await axios.post("/api/items", item, config)

      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`)

      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const incrementDoneNum = async (item) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const res = await axios.put(
        `/api/items/increment/${item._id}`,
        item,
        config
      )

      dispatch({
        type: UPDATE_ITEM_DONE_NUM,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const updateItem = async (item) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config)

      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS })
  }

  const setCurrent = (item) => {
    dispatch({ type: SET_CURRENT_ITEM, payload: item })
  }

  const clearCurrentItem = () => {
    dispatch({ type: CLEAR_CURRENT_ITEM })
  }

  const filterItems = (text) => {
    dispatch({ type: FILTER_ITEMS, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }


  const compareValues = (sortingKey, order = "ascending") => {
    return function (a, b) {
      if (!a.hasOwnProperty(sortingKey) || !b.hasOwnProperty(sortingKey)) {
        return 0
      }
      let AProp
      let BProp
      if (a[sortingKey].label !== undefined) {
        //labelsorting activated
        AProp = a[sortingKey].label
        BProp = b[sortingKey].label
      } else if (a[sortingKey].name !== undefined) {
        //categorysort activated
        AProp = a[sortingKey].name
        BProp = b[sortingKey].name
      } else {
        AProp = a[sortingKey]
        BProp = b[sortingKey]
      }

      const varA = typeof AProp === "string" ? AProp.toUpperCase() : AProp
      const varB = typeof BProp === "string" ? BProp.toUpperCase() : BProp

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return order === "descending" ? comparison * -1 : comparison
    }
  }


  /**
   * @param {string} "name" || "overDoDays" || "category"
   */
  const sortItems = (sortingKey) => {
    const [isAscending, setIsAscending] = useState(true)

    let newOrder = state.items.sort(compareValues(sortingKey, isAscending ? "ascending" : "descending"))

    setIsAscending(!isAscending)

    dispatch({ type: SORT_ITEMS, payload: newOrder })
  }



  const filterOverDoItems = (items) => {
    let filteredItemsArray = []
    items.forEach((element) => {
      element.reps.forEach((rep) => {
        if (
          !rep.isDone &&
          rep.date < new Date() &&
          !filteredArray.includes(element)
        ) {
          filteredArray.push(element)
        }
      })
    })
    return filteredItemsArray
  }

  if (state.items !== null && state.items !== undefined) {
    state.filteredItems = filterOverDoItems(state.items)
  }

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        currentItem: state.currentItem,
        filtered: state.filtered,
        error: state.error,
        filteredItems: state.filteredItems,
        addItem,
        deleteItem,
        setCurrent,
        clearCurrentItem,
        updateItem,
        incrementDoneNum,
        filterItems,
        clearFilter,
        getItems,
        clearItems,
        sortItems,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemState
