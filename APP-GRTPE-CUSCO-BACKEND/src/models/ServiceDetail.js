import mongoose from "mongoose";

const serviceDetailSchema = new mongoose.Schema(
  {
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    URLLink: {
      type: String,
      required: true,
    },
    
    URLDetail: {
      type: String,
      required: true,
    },

    imgPublic_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ServiceDetail", serviceDetailSchema);
