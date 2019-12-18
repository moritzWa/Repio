import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { teal, pink } from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink
  },
  typography: {
    root: {
      fontFamily: "Raleway, Roboto",
      textTransform: "none"
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
)
