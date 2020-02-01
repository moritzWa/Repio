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
  req.user
    ? console.log("req.user.id:", req.user.id) //I guess this comes from the token in header?!
    : console.log("no req.user = hardcoded below")
  try {
    const intarval = await Interval.find({ user: req.user.id })
    res.json(intarval)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route     POST api/intarvals
// @desc      Add new interval
// @access    Private
//no auth
router.post("/", async (req, res) => {
  console.log("req.body:", req.body)
  req.user
    ? console.log("req.user.id:", req.user.id)
    : console.log("no req.user = hardcoded below")

  try {
    const { label, value } = req.body

    const newInterval = new Interval({
      label,
      value,
      user: "5e3558ce07be3d2a1ece64e5"
    })
    const interval = await newInterval.save()
    res.json(interval)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error Post Intervals")
  }
})

//NO EDIT ie PUT FOR NOW

// @route     PUT api/intarvals/:id
// @desc      Update interval
// @access    Private

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
