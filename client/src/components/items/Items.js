import React, { Fragment, useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { CSSTransition, TransitionGroup } from "react-transition-group"
import ItemItem from "./ItemItem"
import AllList from "./AllList"
import ToReviewList from "./ToReviewList"

import Spinner from "../layout/Spinner"
import ItemContext from "../../context/item/itemContext"

import SwipeableViews from "react-swipeable-views"

import { Typography, Paper, AppBar, Grid } from "@material-ui/core/"
import { Toolbar, Tabs, Tab, Box } from "@material-ui/core/"
import { makeStyles, useTheme } from "@material-ui/core/styles"

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    textTransform: "none"
  },
  appBar2: {
    justifyContent: "center",
    textTransform: "none"
  },
  MuiTabs: {
    textTransform: "none"
  },
  pageContent: {
    display: "flex"
  },
  paddingTabEl: {
    "& > div": {
      padding: "10px",
      borderRadius: "0 0 5px 5px"
    }
  }
  /* footer: {
    height: "2vh",
    padding: 0,
    margin: 0,
    borderRadius: 0,
    backgroundColor: "#505050"
  } */
}))

const Items = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const itemContext = useContext(ItemContext)

  const { items, filtered, getItems, loading } = itemContext

  useEffect(() => {
    getItems()
    // eslint-disable-next-line
  }, [])

  if (items !== null && items.length === 0 && !loading) {
    return <h4>Please add a item</h4>
  }

  console.log(items)

  return (
    <Fragment>
      <AppBar className={classes.appBar2} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          text-transform="none"
          centered
          aria-label="full width tabs example"
        >
          <Tab label="To Review" {...a11yProps(0)} />
          <Tab label="All" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
      >
        <TabPanel
          className={classes.paddingTabEl}
          value={value}
          index={0}
          dir={theme.direction}
        >
          <ToReviewList
          /*  filteredItems={filteredItems}
              setItemAsDone={setItemAsDone}
              sort={sort} */
          />
        </TabPanel>
        <TabPanel
          className={classes.paddingTabEl}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <AllList
          /* deleteItem={deleteItem}
          editRow={editRow}
          sort={sort}  */
          />
        </TabPanel>
      </SwipeableViews>
    </Fragment>
  )
}

export default Items
