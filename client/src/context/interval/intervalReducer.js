import {
  GET_INTERVALS,
  ADD_INTERVALS,
  DELETE_INTERVALS,
  INTERVAL_ERROR
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_INTERVALS:
      console.log("using action payload")
      return {
        ...state,
        intervals: action.payload,
        loading: false
      }
    case ADD_INTERVALS:
      console.log("new item in cloud")
    case INTERVAL_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
