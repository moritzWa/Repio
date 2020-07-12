const express = require("express")
const connectDB = require("./config/db")
const path = require("path")

const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/items", require("./routes/items"))
app.use("/api/intervals", require("./routes/intervals"))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Backend Server started on port ${PORT}`))

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
