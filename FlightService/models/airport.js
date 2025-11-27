import mongoose from "mongoose";

const airportSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    address: { type: String },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true
    }
}, { timestamps: true });

airportSchema.virtual("departingFlights", {
    ref: "Flight",
    localField: "_id",
    foreignField: "departureAirportId"
});

airportSchema.virtual("arrivingFlights", {
    ref: "Flight",
    localField: "_id",
    foreignField: "arrivalAirportId"
});
export default mongoose.model("Airport", airportSchema);
