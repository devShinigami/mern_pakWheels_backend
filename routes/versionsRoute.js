import express from "express";
import { getVersions } from "../controllers/versionController.js";

export const versionRouter = express.Router();

versionRouter.get("/getversions", getVersions);
