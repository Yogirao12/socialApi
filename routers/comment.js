const express=require("express");
const router=express.Router();
const commentcontroller=require("../controllers/commentcontroller");
const passport=require("passport");

router.post("/createcomment",passport.authenticate("jwt",{
    session:false
}),commentcontroller.createComment)
router.get("/removecomment",passport.authenticate("jwt",{
    session:false
}),commentcontroller.removeComment)




module.exports=router;