const mongoose=require("mongoose");

const postschema=new mongoose.Schema({
    post:{
        type: String,
        required:true,
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
    }]
},{timestamps:true});
const Post =mongoose.model('Post', postschema);
module.exports=Post;