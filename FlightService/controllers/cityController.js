import { CityService } from "../services/cityService.js";

export async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });

    return res.status(201).json({
      message: "City created successfully",
      data: city,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create city",
      error: error.message,
    });
  }
}

export async function destroyCity(req, res) {
  try {
    const result = await CityService.destroyCity(req.params.id);

    return res.status(200).json({
      message: "City deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete city",
      error: error.message,
    });
  }
}

export async function updateCity(req, res) {
  try {
    const result = await CityService.updateCity(req.params.id, req.body);

    return res.status(200).json({
      message: "City updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update city",
      error: error.message,
    });
  }
}

export async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();

    return res.status(200).json({
      message: "Cities fetched successfully",
      data: cities,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch cities",
      error: error.message,
    });
  }
}

export default {
  createCity,
  destroyCity,
  updateCity,
  getCities,
};
