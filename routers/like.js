const express = require("express");
const router = express.Router();
const likecontroller = require("../controllers/likecontroller");
const passport = require("passport");

router.get(
  "/togglelike",
  passport.authenticate("jwt", { session: false }),
  likecontroller.createLike
);

module.exports = router;
