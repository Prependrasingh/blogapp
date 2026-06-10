const post = require("../models/postModel");


exports.createPost = async (req, res) => {
  try {

    const {title , body} = req.body;
    const Post = new post({
        title , body
    });

    const savedPost = await Post.save();

    res.json({
        post:savedPost,
    })
    
  } catch (error) {

    return res.status(400).json({
        error:"Error while creating post"
    });
    
  }
}

exports.getAllPosts = async (req , res) => {
    try{

        const Posts = await post.find().populate("comments");
        res.json({
            Posts,
        })

    }
    catch(error){

        return res.status(400).json({
            error: "Error while fetching posts",
            
        })

    }
}