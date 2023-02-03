const modal=require("../modal/post");
module.exports.home = async function(req,res){
    
    try{
        const posts=await modal.find({});
        return res.status(200).json({
            message:"post fetches successfully",
            success:true,
            data:{posts,user:req.user}
        })
    }
    catch(err){
        return res.status(422).json({
            message:"something error",
            success:false
        })
    }

}

