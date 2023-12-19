import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [25, "Username can't exceed 25 characters"],
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
        url: {
          type: String,
          trim: true
        },
        type: {
          type: String,
          enum: ["Social", "General"]
        }
      }
    ],

    profileImageUrl: String,

    specialization: [{ type: String, trim: true }],

    description: {
      type: String,
      minlength: [
        10,
        "Please provide a meaningful description above 10 characters"
      ],
      trim: true
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
