function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Flight Number was not found in the incoming request",
    });
  }
  if (!req.body.airplaneId) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Airplane ID was not found in the incoming request",
    });
  }
  if (!req.body.departureAirportId) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Departure Airport ID was not found in the incoming request",
    });
  }
  if (!req.body.arrivalAirportId) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Arrival Airport ID was not found in the incoming request",
    });
  }
  if (!req.body.arrivalTime) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Arrival Time was not found in the incoming request",
    });
  }
  if (!req.body.departureTime) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Departure Time was not found in the incoming request",
    });
  }
  if (!req.body.price) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Price was not found in the incoming request",
    });
  }
  if (!req.body.totalSeats) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "The Seats were not found in the incoming request",
    });
  }

  next();
}

function validateDateTime(req, res, next) {
  const { arrivalTime, departureTime } = req.body;

  if (isNaN(new Date(arrivalTime)) || isNaN(new Date(departureTime))) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "Please enter the Departure Time or Arrival Time format correctly",
    });
  }

  if (new Date(departureTime) >= new Date(arrivalTime)) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error:
        "Departure Time must be earlier than Arrival Time",
    });
  }

  next();
}

function validatePriceAndSeats(req, res, next) {
  const { price, totalSeats } = req.body;

  if (price < 0) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "Flight price cannot be negative",
    });
  }

  if (totalSeats < 0) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "Flight seats cannot be negative",
    });
  }

  next();
}

function validateArrivalDestinationCodeReqBody(req, res, next) {
  if (req.body.arrivalAirportId === req.body.departureAirportId) {
    return res.status(400).json({
      message: "Failed to create a Flight",
      error: "Arrival and Departure Airport IDs cannot be the same",
    });
  }
  next();
}

function validateArrivalDestinationCodeQueryParams(req, res, next) {
  if (req.query.trips) {
    const [departureAirportId, arrivalAirportId] = req.query.trips.split("-");

    if (!departureAirportId || !arrivalAirportId) {
      return res.status(400).json({
        message: "Invalid Query Parameter",
        error:
          "Enter the Arrival Airport ID and Departure Airport ID correctly",
      });
    }

    if (departureAirportId === arrivalAirportId) {
      return res.status(400).json({
        message: "Invalid Query Parameter",
        error:
          "Arrival Airport ID & Departure Airport ID cannot be same",
      });
    }
  }

  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  if (req.body.seats === undefined) {
    return res.status(400).json({
      message: "Failed to update the Flight",
      error: "Seats value was not found in the incoming request",
    });
  }

  if (req.body.seats < 0) {
    return res.status(400).json({
      message: "Failed to update the Flight",
      error: "Seats cannot be negative",
    });
  }

  next();
}

export default {
  validateCreateRequest,
  validateDateTime,
  validatePriceAndSeats,
  validateArrivalDestinationCodeReqBody,
  validateArrivalDestinationCodeQueryParams,
  validateUpdateSeatsRequest,
};
