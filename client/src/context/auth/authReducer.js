import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      console.log("removing token again", action.payload)
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      }
    case ADD_CATEGORY:
      console.log("starting to add new category", action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          categories: [...state.user.categories, action.payload]
        }
      }
    case DELETE_CATEGORY:
      console.log("startign to update categories array")
      return {
        ...state,
        user: {
          ...state.user,
          categories: state.user.categories.filter(
            categories => categories._id !== action.payload
          )
        }
      }
    case CATEGORY_ERROR:
      console.log("starting to delet categories obj")
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
