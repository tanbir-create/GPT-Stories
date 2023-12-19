import mongoose from "mongoose";
import validator from "validator";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"]
    },

    title: {
      type: String,
      required: [true, "Title of the post is required"],
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    url: {
      type: String,
      required: [true, "Please enter the URL of your AI story"],
      validate: [validator.isURL, "Please enter a valid URL"],
      trim: true
    },

    category: {
      type: String,
      required: [true, "Select a category so users can find your post"],
      trim: true
    },

    images: [
      {
        type: String
      }
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },

  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
