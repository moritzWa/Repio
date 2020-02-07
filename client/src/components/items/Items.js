import React, { Fragment, useContext, useEffect } from "react"
import PropTypes from "prop-types"

import AllList from "./AllList"
import ToReviewList from "./ToReviewList"

import ItemContext from "../../context/item/itemContext"

import SwipeableViews from "react-swipeable-views"

import { Typography, Paper, AppBar, Grid } from "@material-ui/core/"
import { Tabs, Tab, Box } from "@material-ui/core/"
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
    height: "70.25vh",
    overflow: "auto"
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
}))

const Items = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const itemContext = useContext(ItemContext)

  const { getItems } = itemContext

  useEffect(() => {
    getItems()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Paper className={classes.root}>
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
        <Grid container justify="center" alignItems="center">
          <Grid item xs={11} sm={11} md={10} lg={6}>
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
                <ToReviewList />
              </TabPanel>
              <TabPanel
                className={classes.paddingTabEl}
                value={value}
                index={1}
                dir={theme.direction}
              >
                <AllList />
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  )
}

export default Items
