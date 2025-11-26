import FlightService  from "../services/flightService.js";

export async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });

    return res.status(201).json({
      message: "Flight created successfully",
      data: flight,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);

    return res.status(200).json({
      message: "Flights fetched successfully",
      data: flights,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch flights",
      error: error.message,
    });
  }
}

export async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);

    return res.status(200).json({
      message: "Flight fetched successfully",
      data: flight,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch flight",
      error: error.message,
    });
  }
}

export async function updateSeats(req, res) {
  try {
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });

    return res.status(200).json({
      message: "Seats updated successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update seats",
      error: error.message,
    });
  }
}

export async function destroyFlight(req, res) {
  try {
    const flight = await FlightService.destroyFlight(req.params.id);

    return res.status(200).json({
      message: "Flight deleted successfully",
      data: flight,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete flight",
      error: error.message,
    });
  }
}

export default {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
  destroyFlight
}
