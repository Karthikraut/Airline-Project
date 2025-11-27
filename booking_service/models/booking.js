import mongoose from "mongoose";
import {Enums} from "../common/enums.js";
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;

const bookingSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [BOOKED, CANCELLED, INITIATED, PENDING],
      default: INITIATED,
      required: true,
    },
    noOfSeats: {
      type: Number,
      required: true,
      default: 1,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Booking", bookingSchema);
