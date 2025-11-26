import express from "express"

import AirportController from "../../controllers/airportController.js"
import AirportMiddlewares from "../../middlewares/airportMiddleware.js"

const router = express.Router();

router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

router.get("/", AirportController.getAirports);

router.get("/:id", AirportController.getAirport);

router.delete("/:id", AirportController.destroyAirport);

router.patch(
  "/:id",
  AirportMiddlewares.validateUpdateRequest,
  AirportController.updateAirport
);

export default router;
