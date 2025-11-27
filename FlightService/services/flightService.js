import { FlightRepository } from "../repositories/flightRepository.js";

const flightRepository = new FlightRepository();

/**
 * Create a new flight
 */
export async function createFlight(data) {
  try {
    return await flightRepository.create(data);
  } catch (error) {
    throw new Error("Failed to create flight: " + error.message);
  }
}

export async function getAllFlights(query = {}) {
  const customFilter = {};
  let sortFilter = {};

  const endingTripTime = "T23:59:59.999Z"; // ISO string for end of the day

  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      $gte: Number(minPrice),
      $lte: maxPrice ? Number(maxPrice) : 100000,
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = { $gte: Number(query.travellers) };
  }

  if (query.tripDate) {
    const start = new Date(query.tripDate);
    const end = new Date(query.tripDate + endingTripTime);
    customFilter.departureTime = { $gte: start, $lte: end };
  }

  if (query.sort) {
    // Example: "departureTime_ASC,price_DESC"
    const sortObj = {};
    query.sort.split(",").forEach((param) => {
      const [field, order] = param.split("_");
      sortObj[field] = order.toUpperCase() === "ASC" ? 1 : -1;
    });
    sortFilter = sortObj;
  }

  try {
    return await flightRepository.getAllFlights(customFilter, sortFilter);
  } catch (error) {
    throw new Error("Failed to fetch flights: " + error.message);
  }
}

/**
 * Get flight by ID
 */
export async function getFlight(id) {
  try {
    return await flightRepository.getFlightById(id);
  } catch (error) {
    throw new Error("Failed to fetch flight: " + error.message);
  }
}

/**
 * Update remaining seats of a flight
 * data = { flightId, seats, dec: true/false }
 */
export async function updateSeats(data) {
  try {
    return await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
  } catch (error) {
    throw new Error("Failed to update flight seats: " + error.message);
  }
}

/**
 * Delete flight
 */
export async function destroyFlight(id) {
  try {
    return await flightRepository.deleteFlight(id);
  } catch (error) {
    throw new Error("Failed to delete flight: " + error.message);
  }
}


export default {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
  destroyFlight
};