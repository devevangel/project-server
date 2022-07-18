const express = require("express");
const postController = require("../Controllers/Posts");
const authController = require("../Controllers/Auth");

const router = express.Router();

router.route("/me").get(authController.protect, postController.getUserPosts);

router
  .route("/")
  .post(
    authController.protect,
    postController.upload.single("document"),
    postController.uploadPhoto,
    postController.createPost
  )
  .get(authController.protect, postController.getPosts);

module.exports = router;
