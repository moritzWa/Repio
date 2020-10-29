import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  CLEAR_ITEMS,
  UPDATE_ITEM_DONE_NUM,
  SORT_ITEMS
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case ADD_ITEM:
      console.log("new item as res:", action.payload)
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      }
    case UPDATE_ITEM:
    case UPDATE_ITEM_DONE_NUM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      }

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      }
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT_ITEM:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT_ITEM:
      return {
        ...state,
        current: null
      }
    //currently no sorting function
    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items.filter(item => {
          const regex = new RegExp(`${action.payload}`, "gi")
          return item.name.match(regex) || item.category.match(regex)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case SORT_ITEMS:
      console.log("sorting")
      return {
        ...state,
        items: action.payload
      }
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
