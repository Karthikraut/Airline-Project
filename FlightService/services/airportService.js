import { AirportRepository } from "../repositories/airportRepository.js";

const airportRepository = new AirportRepository();

export async function createAirport(data) {
  try {
    return await airportRepository.create(data);
  } catch (error) {
    throw new Error("Failed to create airport: " + error.message);
  }
}

export async function getAirports() {
  try {
    return await airportRepository.getAllAirports();
  } catch (error) {
    throw new Error("Failed to fetch airports: " + error.message);
  }
}

export async function getAirport(id) {
  try {
    return await airportRepository.getAirportById(id);
  } catch (error) {
    throw new Error("Failed to fetch airport: " + error.message);
  }
}

export async function destroyAirport(id) {
  try {
    return await airportRepository.deleteAirport(id);
  } catch (error) {
    throw new Error("Failed to delete airport: " + error.message);
  }
}

export async function updateAirport(id, data) {
  try {
    return await airportRepository.updateAirport(id, data);
  } catch (error) {
    throw new Error("Failed to update airport: " + error.message);
  }
}
export default {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
