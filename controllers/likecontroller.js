const likemodal=require("../modal/like");
const postmodal = require("../modal/post");
const commentmodal=require("../modal/comment");
const { post } = require("../routers");



module.exports.createLike=async function(req,res){
        try{
            if(req.query.type=="post"){
                const post= await postmodal.findById(req.query.id);
                if(post){
                    const like=await likemodal.findOne({
                        user:req.user,
                        like:req.query.id
                    })
                    if(like){
                        await postmodal.findByIdAndUpdate(req.query.id,{$pull:{like:like._id}});
                        like.remove();
                        return res.status(200).json({
                            message:"Unlike Successfully!",
                            success:true
                        })
                    }else{
                        const newlike=await likemodal.create({
                            user:req.user,
                            like:req.query.id,
                            onModal:"Post"
                        })
                        post.like.push(newlike);
                        post.save();
                        return res.status(200).json({
                            message:"Liked Successfully!",
                            success:true
                        })
                    }
                }else{
                    return res.status(400).json({
                        message: "Post Not Found !",
                        success: false,
                      });
                }
            }else{
                
            }
        }
        catch(err){
            console.log(err);
            return res.status(400).json({
              message: "Something Error !",
              success: false,
            });
        }
}