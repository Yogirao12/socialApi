const express=require("express");
const router=express.Router();
const homeController=require("../controllers/homeController")
const passport=require("passport")


//router works
router.get("/",passport.authenticate("jwt",{session:false}),homeController.home);

router.use('/user',require('./user'))
router.use('/post',require('./post'))



module.exports=router;