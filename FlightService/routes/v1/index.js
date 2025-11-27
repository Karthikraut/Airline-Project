import express from "express";

import airplaneRoutes from "./airplaneRoute.js";
import cityRoutes from "./cityRoute.js";
import airportRoutes from "./airportRoute.js";
import flightRoutes from "./flightRoute.js";

const router = express.Router();

// If you have router.use(), add them here
// Example:
// router.use("/airplanes", airplaneRoutes);



/*
router.get("/info", (req, res) => {
  // Link : http://localhost:3000/api/v1/info
  return res.json({ ms: "OK" });
});
*/
// Replace the above code using this current clean code

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);


export default router;
