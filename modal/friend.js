const mongoose =require("mongoose");


const friendschema = new mongoose.Schema({
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
       friend:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
       }

})

const Friend=mongoose.model("Friend",friendschema);
module.exports=Friend;