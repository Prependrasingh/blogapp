const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const newPost = await Post.create({
      title,
      body,
    });

    return res.status(201).json({
      success: true,
      post: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("comments")
      .sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      Posts: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Error while fetching posts",
    });
  }
};