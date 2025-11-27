import mongoose from "mongoose"
const cancelBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    accountNo: {
      type: String,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Cancel_Booking", cancelBookingSchema);
