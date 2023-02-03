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
    console.log("query:", req.query.id);
    console.log("query post:", post);
    console.log("req.user :", req.user);
    if (post) {
      console.log(post.user._id.toString(), "post user id ");
      console.log(req.user.id, "req user id");
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
    console.log(err);
    return res.status(400).json({
      message: "Something Error!",
      success: false,
    });
  }
};
