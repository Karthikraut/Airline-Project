import AirportService  from "../services/airportService.js";

export async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    return res.status(201).json({
      message: "Airport created successfully",
      data: airport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create airport",
      error: error.message,
    });
  }
}

export async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();

    return res.status(200).json({
      message: "Airports fetched successfully",
      data: airports,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch airports",
      error: error.message,
    });
  }
}

export async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);

    return res.status(200).json({
      message: "Airport fetched successfully",
      data: airport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch airport",
      error: error.message,
    });
  }
}

export async function destroyAirport(req, res) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);

    return res.status(200).json({
      message: "Airport deleted successfully",
      data: airport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete airport",
      error: error.message,
    });
  }
}

export async function updateAirport(req, res) {
  try {
    const airport = await AirportService.updateAirport(req.params.id, req.body);

    return res.status(200).json({
      message: "Airport updated successfully",
      data: airport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update airport",
      error: error.message,
    });
  }
}

export default {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
