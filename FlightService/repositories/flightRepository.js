import Flight  from "../models/flight.js";

export class FlightRepository {
  constructor() {}

  // Create a flight
  async create(data) {
    const flight = await Flight.create(data);
    return flight;
  }

  // Get all flights (with optional filters & sorting)
  async getAllFlights(filter = {}, sort = {}) {
    return Flight.find(filter)
      .populate("airplaneId")
      .populate({
        path: "departureAirportId",
        populate: { path: "cityId" },
      })
      .populate({
        path: "arrivalAirportId",
        populate: { path: "cityId" },
      })
      .sort(sort);
  }

  // Get flight by ID
  async getFlightById(id) {
    const flight = await Flight.findById(id)
      .populate("airplaneId")
      .populate({
        path: "departureAirportId",
        populate: { path: "cityId" },   
      })
      .populate({
        path: "arrivalAirportId",
        populate: { path: "cityId" },
      });
    if (!flight) throw new Error("Flight not found");
    return flight;
  }

  // Get all flights without any joins (simple list)
  async getAll() {
    return Flight.find();
  }

  // Update flight by ID
  async update(id, data) {
    const flight = await Flight.findByIdAndUpdate(id, data, { new: true });
    if (!flight) throw new Error("Flight not found to update");
    return flight;
  }

  // Delete flight by ID
  async deleteFlight(id) {
    const flight = await Flight.findByIdAndDelete(id);
    if (!flight) throw new Error("Flight not found to delete");
    return flight;
  }

  /**
   * Update remaining seats
   * dec = true -> decrement seats
   * dec = false -> increment seats
   */
  async updateRemainingSeats(flightId, seats, dec = true) {
    const flight = await Flight.findById(flightId);
    if (!flight) throw new Error("Flight not found");

    if (dec) {
      if (flight.totalSeats < seats) throw new Error("Not enough seats available");
      flight.totalSeats -= seats;
    } else {
      flight.totalSeats += seats;
    }

    await flight.save();
    return flight;
  }
}
