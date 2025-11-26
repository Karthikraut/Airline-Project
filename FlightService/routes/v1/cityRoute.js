import express from "express"

import CityController from "../../controllers/cityController.js"
import CityMiddlewares from "../../middlewares/cityMiddleware.js"

const router = express.Router();

router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

router.delete("/:id", CityController.destroyCity);

router.get("/", CityController.getCities);

router.patch(
  "/:id",
  CityMiddlewares.validateUpdateRequest,
  CityController.updateCity
);
export default router;
