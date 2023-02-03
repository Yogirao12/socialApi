const express=require("express");
const router=express.Router();
const postcontroller=require("../controllers/postcontroller");
const passport=require("passport");

router.post("/createpost",passport.authenticate("jwt",{
    session:false
}),postcontroller.createPost)
router.get("/removepost",passport.authenticate("jwt",{
    session:false
}),postcontroller.removePost)
module.exports=router;