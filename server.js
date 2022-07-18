const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// Loading environment variables
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Configuring couldinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Connecting to MongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
