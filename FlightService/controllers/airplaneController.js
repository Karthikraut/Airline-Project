import { AirplaneService } from "../services/index.js";

// POST /airplanes
export async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });

    return res.status(201).json({
      message: "Airplane created successfully",
      data: airplane,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create airplane",
      error: error.message,
    });
  }
}

// GET /airplanes
export async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();

    return res.status(200).json({
      message: "Airplanes fetched successfully",
      data: airplanes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch airplanes",
      error: error.message,
    });
  }
}

// GET /airplanes/:id
export async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);

    return res.status(200).json({
      message: "Airplane fetched successfully",
      data: airplane,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch airplane",
      error: error.message,
    });
  }
}

// DELETE /airplanes/:id
export async function destroyAirplane(req, res) {
  try {
    const airplane = await AirplaneService.destroyAirplane(req.params.id);

    return res.status(200).json({
      message: "Airplane deleted successfully",
      data: airplane,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete airplane",
      error: error.message,
    });
  }
}

// PATCH /airplanes/:id
export async function updateAirplane(req, res) {
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id, req.body);

    return res.status(200).json({
      message: "Airplane updated successfully",
      data: airplane,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update airplane",
      error: error.message,
    });
  }
}

export default {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
