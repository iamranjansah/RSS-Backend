import mongoose from "mongoose";

const schema = new mongoose.schema({});

export const User = mongoose.model("User", schema);
