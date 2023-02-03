const postmodal = require("../modal/post");

// -------------- CREATING NEW POST ----------------------
module.exports.createPost = async function (req, res) {
  try {
    const post = await postmodal.create({
      post: req.body.post,
      user: req.user._id,
    });

    if (post) {
      return res.status(200).json({
        message: "Post Created Successfully!",
        success: true,
        data: {
          post: post,
        },
      });
    } else {
      return res.status(422).json({
        message: "Post Not Created !",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Something Error !",
      success: false,
    });
  }
};

// ---------------- REMOVING POST -------------------
module.exports.removePost = async function (req, res) {
  try {
    const post = await postmodal.findById(req.query.id);
   
    if (post) {
      
      if (post.user._id.toString() !== req.user.id) {
        return res.status(422).json({
          message: "Only  Owner Can Delete Post!",
          success: false,
        });
      }
      post.remove();
      return res.status(200).json({
        message: "Post Removed Successfully!",
        success: true,
        data: {
          post: post,
        },
      });
    } else {
      return res.status(422).json({
        message: "Post Not Deleted!",
        success: false,
      });
    }
  } catch (err) {
    
    return res.status(400).json({
      message: "Something Error!",
      success: false,
    });
  }
};
