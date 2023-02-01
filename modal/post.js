const mongoose=require("mongoose");

const postschema=new mongoose.Schema({
    post:{
        type: String,
        required:true,
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
},{timestamps:true});
const post =mongoose.model('post', postschema);
module.exports=post;