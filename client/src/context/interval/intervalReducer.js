import {
  GET_INTERVALS,
  ADD_INTERVAL,
  DELETE_INTERVAL,
  INTERVAL_ERROR
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_INTERVALS:
      return {
        ...state,
        intervals: action.payload,
        loading: false
      }
    case ADD_INTERVAL:
      return {
        ...state,
        intervals: [action.payload, ...state.intervals],
        loading: false
      }
    case DELETE_INTERVAL:
      console.log(action.payload)
      return {
        ...state,
        intervals: state.intervals.filter(ival => ival._id !== action.payload),
        loading: false
      }
    case INTERVAL_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
