const modal = require("../modal/post");

// ------------- FOR HOME PAGE -------------------
module.exports.home = async function (req, res) {
  try {
    const posts = await modal.find({}).populate("user", "name").populate({
        path:"comment",
        strictPopulate:false,
        populate:{
            path:"user",
            select:"-password -email"

        }
    })
    return res.status(200).json({
      message: "Posts Fetch Successfully!",
      success: true,
      data: { posts},
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({
      message: "Something Error",
      success: false,
    });
  }
};
