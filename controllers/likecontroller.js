const likemodal = require("../modal/like");
const postmodal = require("../modal/post");
const commentmodal = require("../modal/comment");

module.exports.createLike = async function (req, res) {
  try {
    if (req.query.type == "post") {
      const post = await postmodal.findById(req.query.id);
      if (post) {
        const like = await likemodal.findOne({
          user: req.user,
          like: req.query.id,
        });
        if (like) {
          await postmodal.findByIdAndUpdate(req.query.id, {
            $pull: { like: like._id },
          });
          like.remove();
          return res.status(200).json({
            message: "Unlike Post Successfully!",
            success: true,
          });
        } else {
          const newlike = await likemodal.create({
            user: req.user,
            like: req.query.id,
            onModal: "Post",
          });
          post.like.push(newlike);
          post.save();
          return res.status(200).json({
            message: " Post Liked Successfully!",
            success: true,
          });
        }
      } else {
        return res.status(400).json({
          message: "Post Not Found !",
          success: false,
        });
      }
    } else {
      const comment = await commentmodal.findById(req.query.id);
      if (comment) {
        const like = await likemodal.findOne({
          user: req.user,
          like: req.query.id,
        });
        if (like) {
          await commentmodal.findByIdAndUpdate(req.query.id, {
            $pull: { like: like._id },
          });
          like.remove();
          return res.status(200).json({
            message: "Unlike Comment Successfully!",
            success: true,
          });
        } else {
          const newlike = await likemodal.create({
            user: req.user,
            like: req.query.id,
            onModal: "Comment",
          });
          comment.like.push(newlike);
          comment.save();
          return res.status(200).json({
            message: "Comment Liked Successfully!",
            success: true,
          });
        }
      } else {
        return res.status(400).json({
          message: "Comment Not Found !",
          success: false,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Something Error !",
      success: false,
    });
  }
};
