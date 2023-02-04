const friendmodal=require("../modal/friend");
const usermodal=require("../modal/user");

module.exports.makeFriend=async function(req,res){
    try{
     const user=await usermodal.findById(req.query.id);
     if(user){
        const friendship= await friendmodal.findOne({
            user:req.user,
            friend:user
        })
        if(friendship){
            await usermodal.findByIdAndUpdate(req.user, {
                $pull: { friend: friendship._id },
              });
              friendship.remove();
              return res.status(200).json({
                message:`${user.name} Unfriend Successfully`,
                success:true
              })
        }else{
            const friend=await friendmodal.create({
                user:req.user,
                friend:user
            })
            const currentuser =await usermodal.findById(req.user.id);
            currentuser.friend.push(friend);
            currentuser.save();
            return res.status(200).json({
                message:`${user.name} Become Friend Successfully`,
                success:true
            })
        }
     }else{
        return res.status(422).json({
            message:"User Not Found",
            success:false
        })
     }
    }
    catch{
        console.log(err);
    return res.status(400).json({
      message: "Something Error !",
      success: false,
    });
    }
}