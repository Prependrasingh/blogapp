const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Business Logic
exports.createComment = async (req, res) => {
  try {
    // Fetch data from request body
    const { post, user, body } = req.body;

    // Create comment
    const comment = new Comment({
      post,
      user,
      body,
    });

    // Save comment
    const savedComment = await comment.save();

    // Update post with comment ID
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { returnDocument: "after" },
    ).populate("comments");

    res.status(200).json({
      success: true,
      comment: savedComment,
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while creating comment",
    });
  }
};
