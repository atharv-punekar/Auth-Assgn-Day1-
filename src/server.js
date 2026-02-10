// server.js

const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

app.use(express.static("public"));


// Use routes
app.use("/auth", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
