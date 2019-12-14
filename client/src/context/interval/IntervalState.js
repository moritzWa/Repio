import React from "react"
import IntervalContext from "./intervalContext"

const IntervalState = props => {
  const intervalTypes = [
    { id: 0, value: [1, 7, 14, 28, 56, 112, 224, 448], label: "Longterm" },
    { id: 1, value: [1, 4, 7, 10, 14, 21, 28, 38], label: "Shortterm" }
  ]

  //compute days for item for given Intervalnames
  const computeDays = intervalType => {
    /* const days =  
    return y */
    console.log(intervalType)
  }

  return (
    <IntervalContext.Provider
      value={{
        computeDays
      }}
    >
      {props.children}
    </IntervalContext.Provider>
  )
}

export default IntervalState
