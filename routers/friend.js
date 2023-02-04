const express=require("express");
const router=express.Router();
const friendcontroller=require("../controllers/friendcontroller");
const passport=require("passport");


router.get("/makefriend",passport.authenticate("jwt",{
    session:false
}),friendcontroller.makeFriend)

module.exports=router;