import mongoose from "mongoose";

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Role", roleSchema);
