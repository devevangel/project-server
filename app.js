const express = require("express");
const compression = require("compression");
const cors = require("cors");

// Routes
const postRouter = require("./Routes/Posts");
const userRouter = require("./Routes/User");

const app = express();

// Middlewares
app.use(cors());
app.use(compression());
app.use(express.json());

// Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Handling all unhandled routes
app.all("*", (req, res, next) => {
  res.send(`Can't find ${req.originalUrl} on this server`);
  return next();
});

module.exports = app;
