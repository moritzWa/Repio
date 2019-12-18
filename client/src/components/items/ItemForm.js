import React, { useState, useContext, useEffect, Fragment } from "react"
import ItemContext from "../../context/item/itemContext"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid, Paper, TextField, MenuItem } from "@material-ui/core/"
import SaveIcon from "@material-ui/icons/Save"

const ItemForm = () => {
  const itemContext = useContext(ItemContext)

  const { addItem, updateItem, clearCurrent, current } = itemContext

  const defaultInterval = "Longterm"

  const empty = {
    name: "",
    date: new Date(),
    doneNum: 0,
    interval: defaultInterval,
    category: "Business"
  }

  useEffect(() => {
    if (current !== null) {
      setItem(current)
    } else {
      setItem(empty)
    }
  }, [itemContext, current])

  const [item, setItem] = useState(empty)

  const { name, date, doneNum, interval, category } = item

  const onChange = e => setItem({ ...item, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addItem(item)
    } else {
      updateItem(item)
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  const formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [year, month, day].join("-")
  }

  const categories = [
    {
      name: "Business"
    },
    {
      name: "Culture"
    }
  ]

  const useStyles = makeStyles({
    FormPaper: {
      margin: "1rem",
      backgroundColor: "white",
      padding: "3px",
      textAlign: "center"
    },
    FormItem: {
      margin: "10px"
    },
    FormItemDate: {
      margin: "10px",
      width: "140px"
    },
    FormItemReviews: {
      margin: "10px",
      width: "50px"
    },
    FormItemSelect: {
      margin: "10px",
      width: "100px"
    },
    submitButton: {
      margin: "20px 10px"
    },
    menu: {
      width: 200
    }
  })
  const classes = useStyles()

  return (
    <Fragment>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={11} sm={8} md={6} lg={5}>
          <Paper className={classes.FormPaper}>
            <form onSubmit={onSubmit} className={classes.Form}>
              <TextField
                className={classes.FormItem}
                type="text"
                label="Learn Item Name"
                placeholder="i.e. XYZ Podcast/Book"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
              <TextField
                className={classes.FormItemReviews}
                style={{ margin: "1.6rem 20px 10px 10px" }}
                type="number"
                placeholder="Reviews done"
                name="doneNum"
                value={doneNum}
                onChange={onChange}
              />

              <TextField
                name="date"
                className={classes.FormItemDate}
                value={formatDate(!date ? new Date() : date)}
                id="date"
                label="Date added"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={onChange}
              />

              <TextField
                name="interval"
                className={classes.FormItemSelect}
                value={interval}
                select
                label="Interval"
                onChange={onChange}
              >
                <MenuItem value="Longterm">Longterm</MenuItem>
                <MenuItem value="Shortterm">Shortterm</MenuItem>
              </TextField>
              <TextField
                name="category"
                className={classes.FormItemSelect}
                value={category}
                onChange={onChange}
                label="Category"
                select
              >
                {categories.map(option => (
                  <MenuItem /* key={option.id} */ value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                startIcon={<SaveIcon />}
              >
                {current ? "Update Item" : "Add Item"}
              </Button>
              {current && (
                <Button
                  variant="contained"
                  color="grey"
                  className={classes.button}
                  onClick={clearAll}
                >
                  Clear
                </Button>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default ItemForm
