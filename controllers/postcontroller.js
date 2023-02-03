const postmodal=require("../modal/post");


module.exports.createPost=async function(req, res){
     try{
       const post= await postmodal.create({
        post:req.body.post,
        user:req.user._id
       })
       
    if(post){
        return res.status(200).json({
            message:"post created successfully",
            success:true,
            data:{
                post:post
            }
        })
    }else{
        return res.status(422).json({
            message:"post not created",
            success:false
        })
    }
       
     }
     catch(err){
        console.log(err);
         return res.status(400).json({
            message:"something error",
            success:false
         })
     }
}
module.exports.removePost=async function(req, res){
    try{
      const post= await postmodal.findById(req.query.id)
      console.log("qurey",req.query.id);
      console.log(post);
      console.log("999999",req.user);
   if(post){
    console.log( post.user.id, "****");
    console.log( req.user.id, "222");
    if(post.user._id.toString()!==req.user.id){
        return res.status(422).json({
            message:"only  owner can delete post",
            success:false
        })
    }
    post.remove();
       return res.status(200).json({
           message:"post removed successfully",
           success:true,
           data:{
               post:post
           }
       })
   }else{
       return res.status(422).json({
           message:"post not deleted",
           success:false
       })
   }
      
    }
    catch(err){
       console.log(err);
        return res.status(400).json({
           message:"something error",
           success:false
        })
    }
}