const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator/check")

const User = require("../models/User")

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, categories } = req.body

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
          { name: "Business", _id: "1" },
          { name: "Technology", _id: "2" },
          { name: "Culture", _id: "3" },
          { name: "History", _id: "4" }
        ]
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
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
      function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log("added category")
        }
      }
    )

    res.json(req.body)
  } catch (err) {
    console.log(err.message)
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
      function(err, doc) {
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
