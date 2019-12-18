import React, { useState, Fragment, useContext, useEffect } from "react"
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
  table: {
    minWidth: 500
  },
  tableHeader:{
    background: '#f4f4f4'
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
  const {
    items,
    filteredItems,
    filtered,
    setCurrent,
    deleteItem,
    clearCurrent,
    getItems,
    loading,
    incrementDoneNum
  } = itemContext

  return (
    <>
      {items !== null ? (
        <Paper elevation={0} className={classes.root}>
          {filteredItems.length > 0 ? (
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.headCell}
                    //onClick={() => props.sort("name")}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    className={classes.headCell}
                    // onClick={() => props.sort("overDoDays")}
                  >
                    Overdo since
                  </TableCell>
                  <TableCell
                    className={classes.headCell}
                    //onClick={() => props.sort("category")}
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
              No items left for today 😊{" "}
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
