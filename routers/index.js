const express=require("express");
const router=express.Router();
const homeController=require("../controllers/homeController")



//router works
router.get("/",homeController.home);

router.use('/user',require('./user'))
router.use('/post',require('./post'))



module.exports=router;