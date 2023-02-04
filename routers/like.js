const express=require("express");
const router=express.Router();
const likecontroller=require("../controllers/likecontroller");
const passport=require("passport");


router.post("/createlike",passport.authenticate("jwt",{
    session:false
}),likecontroller.createLike)

module.exports=router;