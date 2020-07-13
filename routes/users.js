const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator/check")

const User = require("../models/User")
const Interval = require("../models/Interval")
const Item = require("../models/Item")

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ msg: "User already exists" })
      }

      user = new User({
        name,
        email,
        password,
        categories: [
          { name: "Business" },
          { name: "Technology" },
          { name: "Psychology" },
          { name: "History" },
        ],
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      const newUser = await user.save()

      //create default cat with user id
      const interval1 = new Interval({
        label: "Longterm",
        value: [7, 14, 24, 35, 49, 84, 140, 231, 371],
        user: newUser._id,
      })
      const newInterval = await interval1.save()

      const interval2 = new Interval({
        label: "Shortterm",
        value: [3, 7, 14, 28, 42, 56, 98, 196],
        user: newUser._id,
      })
      await interval2.save()

      //create example item
      const item = new Item({
        name: "Notes on Spaced Repetition",
        category: "Psychology",
        date: Date.now(),
        doneNum: 0,
        user: newUser._id,
        intervalRef: newInterval._id,
      })
      await item.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route     PUT api/users/addcat/:catName
// @desc      Create new category for User
// @access    Private

router.put("/addcat/:userid", async (req, res) => {
  try {
    //update user by attatching category
    User.findByIdAndUpdate(
      req.params.userid,
      { $push: { categories: req.body } },
      { new: true },
      function (err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log("added category")
        }
      }
    )

    res.json(req.body)
  } catch (err) {
    res.status(500).send("Server Error in addcat")
  }
})

// @route     PUT api/users/delcat/:id
// @desc      Delete category of User
// @access    Private

router.put("/delcat/:userid", async (req, res) => {
  try {
    //update user by attatching category
    User.findByIdAndUpdate(
      req.params.userid,
      { $pull: { categories: req.body } },
      { safe: true, upsert: true },
      function (err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log("deleted category")
        }
      }
    )

    res.json(req.body)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error in delcat")
  }
})

module.exports = router
