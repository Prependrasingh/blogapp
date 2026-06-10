const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // Create Like
    const like = new Like({
      post,
      user,
    });

    // Save Like
    const savedLike = await like.save();

    // Update Post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: {
          likes: savedLike._id,
        },
      },
      {
        returnDocument: "after",
      },
    )
      .populate("likes")
      .exec();

    res.status(200).json({
      success: true,
      like: savedLike,
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error during liking the post",
      error: error.message,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    // Delete like document
    const unLike = await Like.findOneAndDelete({
      post: post,
      _id: like,
    });

    if (!unLike) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    // Remove like ID from post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: {
          likes: like,
        },
      },
      {
        returnDocument: "after",
      },
    ).populate("likes");

    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error while unliking the post",
      error: error.message,
    });
  }
};
exports.dummyLink = (req, res) => {
  res.send("This is dummy page");
};
