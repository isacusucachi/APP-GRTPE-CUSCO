import mongoose from "mongoose";

const institutionalInformationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    iconUrl: {
      type: String,
      required: true,
    },

    urlLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("InstitutionalInformation", institutionalInformationSchema);
