import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [25, "Username can't exceed 25 characters"]
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email Id"]
    },

    password: {
      type: String,
      minlength: 6,
      required: [true, "Please enter a password"],
      select: false
    },

    links: [
      {
        url: String,
        type: {
          type: String,
          enum: ["Social", "General"]
        }
      }
    ],

    profileImageUrl: String,

    specialization: [String],

    description: {
      type: String,
      minlength: [
        10,
        "Please provide a meaningful description above 10 characters"
      ]
    },

    refreshToken: {
      type: String,
      select: false
    }
  },

  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

UserModel.ensureIndexes();

export default UserModel;
