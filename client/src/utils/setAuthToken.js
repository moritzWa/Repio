import axios from "axios"

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token
    console.log("token was passed and set in setAuthToken")
  } else {
    delete axios.defaults.headers.common["x-auth-token"]
  }
}

export default setAuthToken
