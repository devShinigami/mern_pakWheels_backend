import { BlogModel } from "../models/blogModel.js";
import { asyncHandler } from "../middlewares/errorHandling.js";

// !Admin routes
export const createBlog = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { blog } = req.body;
  const newBlog = await new BlogModel(blog);
  await newBlog.save();
  res.status(200).json({
    message: "blog created successfully",
  });
});
