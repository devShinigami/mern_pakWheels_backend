import mongoose from "mongoose";
const adSchema = new mongoose.Schema({
  carDetails: {
    car: mongoose.SchemaTypes.ObjectId,
    carImages: [
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
    city: {
      type: String,
      required: true,
    },
    registeredIn: {
      required: true,
      type: String,
    },
    Color: {
      required: true,
      type: String,
    },
    isFeatured: false,
    milesDriven: {
      required: true,
      type: Number,
    },
  },
  sellerComments: [
    {
      type: String,
      required: true,
    },
  ],
  seller: {
    required: true,
    user: mongoose.SchemaTypes.ObjectId,
  },
  sellingPrice: {
    required: true,
    type: Number,
  },
  adRef: Number,
  postedDate: Date.now(),
});

export const AdModel = new mongoose.model("ads", adSchema);
