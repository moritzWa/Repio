import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  UPDATE_CONTACT_DONENUM,
  SORT_ITEMS
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case ADD_CONTACT:
      console.log("new item as res:", action.payload)
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      }
    case UPDATE_CONTACT:
    case UPDATE_CONTACT_DONENUM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      }

    case DELETE_CONTACT:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      }
    case CLEAR_CONTACTS:
      return {
        ...state,
        items: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    //currently no sorting function
    case FILTER_CONTACTS:
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
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
