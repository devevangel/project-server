const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Please provide a photo."],
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must belong to a user."],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
