import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  modelName: {
    required: true,
    type: String,
  },
  general: {
    engineType: {
      type: String,
      required: true,
    },
    displacement: {
      type: String,
      required: true,
    },
    horsePower: {
      type: String,
      required: true,
    },
    torque: {
      type: String,
      required: true,
    },
    noOfCylinders: {
      type: Number,
      required: true,
    },
    cylinderConfiguration: {
      type: String,
      required: true,
    },
    valveMechanism: {
      type: String,
      required: true,
    },
    fuelSystem: {
      type: String,
      required: true,
    },
    maxSpeed: {
      type: String,
      required: true,
    },
    transmissionType: {
      type: String,
      required: true,
    },
    gearBox: {
      type: String,
      required: true,
    },
    steeringType: {
      type: String,
      required: true,
    },
    powerAssisted: {
      type: String,
      required: true,
    },
    suspension: {
      type: String,
      required: true,
    },
    brakes: {
      type: String,
      required: true,
    },
    wheelType: {
      type: String,
      required: true,
    },
    wheelSize: {
      type: String,
      required: true,
    },
    tyreSize: {
      type: String,
      required: true,
    },
    spareTyre: {
      type: Boolean,
      required: true,
    },
    fuelTankCapacity: {
      type: String,
      required: true,
    },
    mileageCity: {
      type: String,
      required: true,
    },
    mileageHighway: {
      type: String,
      required: true,
    },
    noOfAirbags: {
      type: String,
      required: true,
    },
    newCar: {
      type: Boolean,
      default: false,
    },
  },
  features: {
    safety: [],
    exterior: [],
    instrumentation: [],
    infotainment: [],
    comfortAndConvenience: [],
  },
});

export const CarModel = new mongoose.model("cars", carSchema);
