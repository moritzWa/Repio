import React, { useReducer } from "react"
import axios from "axios"
import IntervalContext from "./intervalContext"
import intervalReducer from "./intervalReducer"
import {
  GET_INTERVALS,
  ADD_INTERVAL,
  DELETE_INTERVAL,
  INTERVAL_ERROR
} from "../types"

const IntervalState = props => {
  const initialState = {
    intervals: null,
    error: null
  }

  const [state, dispatch] = useReducer(intervalReducer, initialState)

  // Get Intervals
  const getIntervals = async () => {
    console.log("token put in header", localStorage.token ? true : false)

    try {
      const res = await axios.get("/api/intervals")
      dispatch({
        type: GET_INTERVALS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: INTERVAL_ERROR,
        payload: err.response.msg
      })
    }
  }

  const addInterval = async interval => {
    interval.value = interval.value.split("-").map(Number)

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.post("/api/intervals", interval, config)

      dispatch({
        type: ADD_INTERVAL,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: INTERVAL_ERROR,
        payload: err.response.msg
      })
    }
  }
  // Delete Item
  const deleteInterval = async id => {
    try {
      await axios.delete(`/api/intervals/${id}`)

      dispatch({
        type: DELETE_INTERVAL,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: INTERVAL_ERROR,
        payload: err.response.msg
      })
    }
  }
  return (
    <IntervalContext.Provider
      value={{
        getIntervals,
        addInterval,
        deleteInterval,
        intervals: state.intervals,
        error: state.error
      }}
    >
      {props.children}
    </IntervalContext.Provider>
  )
}

export default IntervalState
