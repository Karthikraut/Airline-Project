import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  state:{
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

citySchema.virtual("airports", {
  ref: "Airport",
  localField: "_id",
  foreignField: "cityId"
});

export default mongoose.model("City", citySchema);
