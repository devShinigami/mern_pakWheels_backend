import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  versions: [
    {
      ref: "cars",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
});

export const VersionsModel = new mongoose.model("versions", versionSchema);
