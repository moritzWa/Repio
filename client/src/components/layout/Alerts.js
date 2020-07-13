import React, { useContext } from "react"
import Typography from "@material-ui/core/Typography"

import AlertContext from "../../context/alert/alertContext"

const Alerts = () => {
  const alertContext = useContext(AlertContext)

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div className="alert" key={alert.id}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {alert.msg}
        </Typography>
      </div>
    ))
  )
}

export default Alerts
