import express from "express";
import { createBlog } from "../controllers/blogController.js";

export const blogRouter = express.Router();

blogRouter.post("/admin/createblog", createBlog);
