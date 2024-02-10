import express from "express";
import {
  createCar,
  getAllCarsNames,
  getSingleCar,
  removeCar,
} from "../controllers/carController.js";

export const carRouter = express.Router();

carRouter.post("/admin/createcar", createCar);
carRouter.delete("/admin/removecar/:id", removeCar);
carRouter.get("/getallcars", getAllCarsNames);
carRouter.get("/getSingleCar", getSingleCar);
