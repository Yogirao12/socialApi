const commentmodal=require("../modal/comment");
const postmodal = require("../modal/post");

/*********************CREATE COMMENT********************/

module.exports.createComment=async function(req, res){
    try{
        const comment =await commentmodal.create({
            comment:req.body.comment,
            post:req.body.post,
            user:req.user
        })
        if(comment){
            const post=await postmodal.findById(comment.post);
            post.comment.push(comment);
            post.save();
            return res.status(200).json({
                message:"Comment Added Successfully!",
                success:true,
                data:{
                    comment:comment
                }

            })
        }else{
            return res.status(200).json({
                message:"Comment Not Added Successfully!",
                success:false,
                

            })
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

/**********************REMOVE COMMENT********************/
module.exports.removeComment=async function(req, res){
    try{
        const comment=await commentmodal.findById(req.query.id);
        
        if(comment){
            const post=await postmodal.findById(comment.post);
            if(post){
                if(post.user._id.toString()==comment.user._id.toString()||comment.user._id.toString()==req.user.id){
                    await postmodal.findByIdAndUpdate(comment.post,{$pull:{comment:req.query.id}});
                     
                    comment.remove();
                    return res.status(200).json({
                        message:"Comment Deleted Successfully!",
                         success:true,
                         data:{
                            comment:comment
                         }
                    })
                }else{
                    
                    return res.status(400).json({
                      message: "Post Owner And Comment owner Can Delete The Comment!",
                      success: false,
                    });
                }


            }else{
                
                return res.status(400).json({
                  message: "Associated Post Not Found!",
                  success: false,
                });
            }

        }else{
            return res.status(400).json({
                message: "Comment Not Found!",
                success: false,
              });
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



