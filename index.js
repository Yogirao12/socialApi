const express = require("express");
const app = express();
const path = require("path");
const db = require("./confi/mongoose");
const passport = require("passport");
const jwt = require("./confi/passportjwt");
const cors=require("cors");
const PORT = 8000;
app.use(cors());
// ---------- FOR READING REQUEST BODY DATA -------------------
app.use(express.urlencoded());

// ---------------- FOR AUTHENTICATION BY PASSPORTJS-------------
app.use(passport.initialize());

// -------------------- FOR ROUTERS USE -----------------------
app.use("/", require("./routers"));

// ------------------ STARTING THE SERVER ON PARTICULAR PORT----------------------
app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("app is listening on ", PORT);
});
