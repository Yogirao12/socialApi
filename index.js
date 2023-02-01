const express= require("express");
const app=express();
const path=require("path");
const db=require("./confi/mongoose");
const passport=require("passport");



const PORT=8000;

app.use(express.urlencoded());
app.use(passport.initialize());



app.use("/",require("./routers"));


app.listen(PORT,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("app is listening on ",PORT);
})