const mongoose =require("mongoose");


const likeschema = new mongoose.Schema({
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
       like:{
        type: mongoose.Schema.Types.ObjectId,
        refPath:"onModal"
       },
       onModal:{
        type:String,
        enum:["Post","Comment"]
       }

})
const Like=mongoose.model("Like",likeschema);
module.exports=Like;