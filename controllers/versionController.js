import { asyncHandler } from "../middlewares/errorHandling.js";
import { VersionsModel } from "../models/versionsModel.js";

export const getVersions = asyncHandler(async (req, res, next) => {
  const versions = await VersionsModel.find(req.body.make);
  if (!versions) {
    res.status(401).json({
      message: "We are very sorry! We have no versions of this car",
      success: false,
    });
  }
  res.status(200).json({
    versions,
    success: true,
  });
});
