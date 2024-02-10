import { CarModel } from "../models/carModel.js";
import { asyncHandler } from "../middlewares/errorHandling.js";
import { VersionsModel } from "../models/versionsModel.js";
// !Admin routes
export const createCar = asyncHandler(async (req, res, next) => {
  const { make, companyName } = req.body;
  const checkVersion = await VersionsModel.findOne({ make });
  if (checkVersion) {
    const car = await new CarModel(req.body);
    await car.save();
    checkVersion.versions.push(car._id);
    await checkVersion.save();
  } else {
    const car = await new CarModel(req.body);
    await car.save();
    let newVersion = await new VersionsModel({
      make,
      companyName,
    });
    newVersion.versions.push(car._id);
    await newVersion.save();
  }
  res.status(200).json({
    message: "Car saved successfully",
    success: true,
  });
});

export const removeCar = asyncHandler(async (req, res, next) => {
  const car = await CarModel.findById(req.params.id);
  if (!car) {
    return res.status(404).json({ message: "car not found" });
  }
  await car.deleteOne();
  res.status(200).json({ message: "car deleted successfully" });
});

export const updateCar = asyncHandler(async (req, res, next) => {
  const car = await CarModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await car.save();
  res.status(200).json({ message: "Success car was successfully updated" });
});

export const getAllCarsNames = asyncHandler(async (req, res, next) => {
  const { companyName, makeName } = req.query;
  // console.log(companyName);
  // console.log(makeName);
  const foundCars = await VersionsModel.find({ companyName }).select("make");
  let versions = [];
  if (makeName && companyName) {
    const foundVersions = await CarModel.find({
      make: makeName,
      companyName,
    }).select("modelName");
    versions = foundVersions;
    // console.log(foundVersions);
    // res.status(200).json({ foundVersions, message: "found versions" });
  }

  res.status(200).json({ foundCars, versions, message: "Found Cars" });
});

export const getSingleCar = asyncHandler(async (req, res, next) => {
  let carDetails = {
    companyName: req.query.companyName,
    modelName: req.query.model,
    make: req.query.make,
  };
  const car = await CarModel.findOne(carDetails);
  res.status(200).json({
    message: "Car found",
    carId: car._id,
  });
});
