const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Post = require("../Models/Posts");

const storage = multer.diskStorage({});
exports.upload = multer({ storage: storage });

exports.uploadPhoto = async (req, res, next) => {
  const uploadedPhoto = await cloudinary.uploader.upload(req.file.path, {
    folder: `project/photos/${req.user._id}`,
    resource_type: "auto",
    transformation: [{ width: 500, height: 500, crop: "limit", quality: 50 }],
    public_id: `${req.file.originalname}-${req.user._id}`,
    overwrite: true,
  });
  req.upload = uploadedPhoto;
  next();
};

exports.createPost = async (req, res) => {
  const newPost = await Post.create({
    url: req.upload.secure_url,
    description: req.body.description,
    date: req.body.date,
    user: req.user._id,
  });

  res.status(201).json({
    status: "Success",
    data: {
      post: newPost,
    },
  });
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "Success",
    length: posts.length,
    data: {
      posts,
    },
  });
};

exports.getUserPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id });

  res.status(200).json({
    status: "Success",
    length: posts.length,
    data: {
      posts,
    },
  });
};
