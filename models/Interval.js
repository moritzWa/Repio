const mongoose = require("mongoose")

const IntervalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model("interval", IntervalSchema)
