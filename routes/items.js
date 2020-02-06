const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator/check")

const User = require("../models/User")
const Item = require("../models/Item")

// @route     GET api/items
// @desc      Get all users items (tbd with Interval)
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({
      date: -1
    })

    // Tbd add interval data through reference to item

    // Tbd add categorie data through reference to item

    res.json(items)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route     POST api/items
// @desc      Add new item
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // tbd dont add normal interval reference
    const { name, date, doneNum, interval, category, intervalRef } = req.body

    try {
      const newItem = new Item({
        name,
        date,
        doneNum,
        interval,
        category,
        user: req.user.id,
        intervalRef
      })

      const item = await newItem.save()

      res.json(item)
      console.log(item)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route     PUT api/items/increment/:id
// @desc      Increment DoneNum
// @access    Private
router.put("/increment/:id", auth, async (req, res) => {
  const { name, date, doneNum, interval, category } = req.body

  const NewDoneNum = Number(doneNum) + 1
  console.log(NewDoneNum)

  // Build item object
  const itemFields = {}
  if (name) itemFields.name = name
  if (date) itemFields.date = date
  if (doneNum) itemFields.doneNum = NewDoneNum
  if (interval.label) itemFields.interval = interval.label
  if (category) itemFields.category = category

  try {
    let item = await Item.findById(req.params.id)

    if (!item) return res.status(404).json({ msg: "Item not found" })

    // Make sure user owns item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    )

    res.json(item)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route     PUT api/items/:id
// @desc      Update item
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { name, date, doneNum, interval, category } = req.body

  // Build item object
  const itemFields = {}
  if (name) itemFields.name = name
  if (date) itemFields.date = date
  if (doneNum) itemFields.doneNum = doneNum
  if (interval.label) itemFields.interval = interval.label
  if (category) itemFields.category = category

  try {
    let item = await Item.findById(req.params.id)

    if (!item) return res.status(404).json({ msg: "Item not found" })

    // Make sure user owns item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    )

    res.json(item)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route     DELETE api/items/:id
// @desc      Delete item
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id)

    if (!item) return res.status(404).json({ msg: "Item not found" })

    // Make sure user owns item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    await Item.findByIdAndRemove(req.params.id)

    res.json({ msg: "Item removed" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
