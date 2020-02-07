const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator/check")

const User = require("../models/User")
const Item = require("../models/Item")
const Interval = require("../models/Interval")

// @route     GET api/intervals
// @desc      Get all of users intervals
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const intarvals = await Interval.find({ user: req.user.id })
    res.json(intarvals)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route     POST api/intervals
// @desc      Add new interval
// @access    Private
//no auth
router.post("/", auth, async (req, res) => {
  console.log("posting interval", req.user)
  try {
    const { label, value } = req.body

    const newInterval = new Interval({
      label,
      value,
      user: req.user.id
    })
    const interval = await newInterval.save()
    res.json(interval)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error Post Intervals")
  }
})

// @route     DELETE api/intervals/:id
// @desc      Delete interval
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let interval = await Interval.findById(req.params.id)

    if (!interval) return res.status(404).json({ msg: "interval not found" })

    // Make sure user owns interval
    /* if (interval.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Not authorized" })
  } */

    await Interval.findByIdAndRemove(req.params.id)

    res.json({ msg: "interval removed" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
