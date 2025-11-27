import mongoose from "mongoose";

const airplaneSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    default: 0,
    max: 1000
  }
}, { timestamps: true });

airplaneSchema.virtual("flights", {
  ref: "Flight",
  localField: "_id",
  foreignField: "airplaneId"
});

export default mongoose.model("Airplane", airplaneSchema);
