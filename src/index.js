import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
import { dataConnection } from "../database/database.js";
import { carRouter } from "../routes/carRoute.js";
import { userRouter } from "../routes/userRoute.js";
import { blogRouter } from "../routes/blogRoute.js";
import { versionRouter } from "../routes/versionsRoute.js";
const app = express();
let options = { credentials: true, origin: "http://localhost:3000" };
app.use(cors(options));
app.use(bodyParser.json({ limit: "10000kb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "10000kb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(fileUpload());
// config
dotenv.config();
//  database configuration
dataConnection();

app.use("/api/v1", carRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);
app.use("/api/v1", versionRouter);

app.listen("3001", () => {
  console.log("server listening on");
});
