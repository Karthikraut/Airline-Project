import { CityRepository } from "../repositories/cityRepository.js";

const cityRepository = new CityRepository();

export async function createCity(data) {
  try {
    return await cityRepository.createCity(data);
  } catch (error) {
    throw new Error("Failed to create city: " + error.message);
  }
}

export async function destroyCity(id) {
  try {
    return await cityRepository.deleteCity(id);
  } catch (error) {
    throw new Error("Failed to delete city: " + error.message);
  }
}

export async function updateCity(id, data) {
  try {
    return await cityRepository.updateCity(id, data);
  } catch (error) {
    throw new Error("Failed to update city: " + error.message);
  }
}

export async function getCities() {
  try {
    return await cityRepository.getAllCities();
  } catch (error) {
    throw new Error("Failed to fetch cities: " + error.message);
  }
}

export default {
  createCity,
  destroyCity,
  updateCity,
  getCities
};
