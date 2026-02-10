// routes/auth.js

const express = require("express");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../utils/otp");

const router = express.Router();

// In-memory store: { username: { hash, otp } }

const users = {};


// ----------------------------------------
// REGISTER
// ----------------------------------------
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Missing fields" });

  const hash = await bcrypt.hash(password, 10);

  users[username] = { hash };

  console.log("Current Users DB:", users);

  return res.json({ message: "User registered" });

});



// ----------------------------------------
// LOGIN (STEP 1) → PASSWORD CHECK + OTP GENERATION
// ----------------------------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!users[username])
    return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, users[username].hash);

  if (!valid)
    return res.status(400).json({ message: "Invalid credentials" });

  // Password OK → generate OTP
  const otp = generateOTP();
  users[username].otp = otp;

  console.log("Generated OTP:", otp); // <-- Pretend SMS

  return res.json({ message: "OTP sent to your device" });
});


// ----------------------------------------
// LOGIN (STEP 2) → VERIFY OTP
// ----------------------------------------
router.post("/verify-otp", (req, res) => {
  const { username, otp } = req.body;

  if (!users[username] || !users[username].otp)
    return res.status(400).json({ message: "OTP not generated" });

  if (users[username].otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  // OTP success
  users[username].otp = null;

  return res.json({ message: "Login Successful" });
});

module.exports = router;
