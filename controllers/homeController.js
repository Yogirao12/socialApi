const modal = require("../modal/post");

// ------------- FOR HOME PAGE -------------------
module.exports.home = async function (req, res) {
  try {
    const posts = await modal.find({}).populate("user", "email name");
    return res.status(200).json({
      message: "Posts Fetch Successfully!",
      success: true,
      data: { posts, user: req.user },
    });
  } catch (err) {
    return res.status(422).json({
      message: "Something Error",
      success: false,
    });
  }
};
