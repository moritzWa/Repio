import React, { useReducer, useState } from "react"
import axios from "axios"
import IntervalContext from "./intervalContext"
import intervalReducer from "./intervalReducer"
import {
  GET_INTERVALS,
  ADD_INTERVALS,
  DELETE_INTERVALS,
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
    try {
      console.log(await axios.get("/api/intervals"))
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
  console.log(state.intervals)

  return (
    <IntervalContext.Provider
      value={{
        getIntervals,
        intervals: state.intervals,
        error: state.error
      }}
    >
      {props.children}
    </IntervalContext.Provider>
  )
}

export default IntervalState
