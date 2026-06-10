const express = require("express");
const router = express.Router();

const { dummyLink , likePost , unlikePost} = require("../controllers/likecontroller");
const {createComment} = require("../controllers/commentcontroller");
const {createPost , getAllPosts} = require("../controllers/postcontroller");
// const {likepost} = require("../controllers/likecontroller");

console.log("dummyLink =", dummyLink);

router.get("/dummyroute", dummyLink);
router.post("/comments/create" , createComment);
router.post("/posts/create" , createPost);
router.get("/Posts" , getAllPosts);
router.post("/Likes/like" , likePost);
router.post("/likes/unlike" , unlikePost);

module.exports = router;