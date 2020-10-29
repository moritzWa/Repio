import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import ItemContext from "../../context/item/itemContext"
import Spinner from "../layout/Spinner"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "auto"
  },

  tableHeader: {
    background: "#f4f4f4"
  },
  doneText: {
    margin: "2rem",
    textAlign: "center"
  },
  headCell: {
    "&:hover": {
      color: "grey",
      cursor: "pointer",
      transitionDuration: ".3s"
    }
  }
})

const ToReviewList = () => {
  const classes = useStyles()
  const itemContext = useContext(ItemContext)
  const { items, sortItems, filteredItems, incrementDoneNum } = itemContext

  return (
    <>
      {items !== null ? (
        <Paper elevation={1} className={classes.root}>
          {filteredItems.length > 0 ? (
            <Table className={classes.table} aria-label="to review table">
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell
                    className={classes.headCell}
                    onClick={() => sortItems("name")}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    className={classes.headCell}
                    onClick={() => sortItems("overDoDays")}
                  >
                    Overdo since
                  </TableCell>
                  <TableCell
                    className={classes.headCell}
                    onClick={() => sortItems("category")}
                  >
                    Category
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.overDoDays}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => incrementDoneNum(item)}
                          color="primary"
                          className={classes.button}
                          aria-label="Review done"
                        >
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow></TableRow>
                  )}
              </TableBody>
            </Table>
          ) : (
              <Typography className={classes.doneText} variant="h5">
                No items left for today{" "}
                <span role="img" aria-label="emoji">
                  😊
              </span>{" "}
              </Typography>
            )}
        </Paper>
      ) : (
          <Spinner />
        )}
    </>
  )
}
export default ToReviewList
