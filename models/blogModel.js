import mongoose from "mongoose";

const blogScehma = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  blogImages: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now(),
  },
  comments: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

export const BlogModel = new mongoose.model("blogs", blogScehma);
