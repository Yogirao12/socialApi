const express=require("express");
const router=express.Router();
const usercontroller=require("../controllers/usercontroller")

const passport=require("passport");
router.post("/newuser",usercontroller.newuser);

router.post("/create-session",usercontroller.createsession);
router.get("/profile",usercontroller.profile);


module.exports=router;