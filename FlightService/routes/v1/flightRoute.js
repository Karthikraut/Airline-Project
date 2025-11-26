import express from "express"

import FlightController from "../../controllers/flightController.js"
import FlightMiddlewares from "../../middlewares/flightMiddleware.js"

const router = express.Router();

router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightMiddlewares.validateDateTime,
  FlightMiddlewares.validatePriceAndSeats,
  FlightMiddlewares.validateArrivalDestinationCodeReqBody,
  FlightController.createFlight
);
router.get(
  "/",
  FlightMiddlewares.validateArrivalDestinationCodeQueryParams,
  FlightController.getAllFlights
);
router.get("/:id", FlightController.getFlight);

router.patch(
  "/:id/seats", // Update the seats of the flight having id as :id | Request coming from Flights booking Service [cancelOldBookings()]
  FlightMiddlewares.validateUpdateSeatsRequest,
  FlightController.updateSeats
);
router.delete("/:id", FlightController.destroyFlight);


export default router;
