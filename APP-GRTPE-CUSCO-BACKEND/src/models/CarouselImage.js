import mongoose from "mongoose";

const carouselImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    URLLink: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("CarouselImage", carouselImageSchema);
