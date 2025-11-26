import { AirplaneRepository } from "../repositories/airplaneRepository.js";

const airplaneRepository = new AirplaneRepository();

export async function createAirplane(data) {
  try {
    return await airplaneRepository.create(data);
  } catch (error) {
    throw new Error("Failed to create airplane: " + error.message);
  }
}

export async function getAirplanes() {
  try {
    return await airplaneRepository.getAllAirplanes();
  } catch (error) {
    throw new Error("Failed to fetch airplanes: " + error.message);
  }
}

export async function getAirplane(id) {
  try {
    return await airplaneRepository.getAirplaneById(id);
  } catch (error) {
    throw new Error("Failed to fetch airplane: " + error.message);
  }
}

export async function destroyAirplane(id) {
  try {
    return await airplaneRepository.deleteAirplane(id);
  } catch (error) {
    throw new Error("Failed to delete airplane: " + error.message);
  }
}

export async function updateAirplane(id, data) {
  try {
    return await airplaneRepository.updateAirplane(id, data);
  } catch (error) {
    throw new Error("Failed to update airplane: " + error.message);
  }
}

export default {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
