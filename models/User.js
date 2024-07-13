import mongoose from "mongoose";
import validator from "validator";
import isEmail from "validator/lib/isEmail";

const schema = new mongoose.schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [6, "Password must be atleast 6 characters"],
    unique: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  subscription: {
    id: String,
    status: String,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  playlist: [
    {
      course: {
        type: mongoose.Schema.type.ObjectId,
        ref: "course",
      },
      poster: String,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

export const User = mongoose.model("User", schema);
