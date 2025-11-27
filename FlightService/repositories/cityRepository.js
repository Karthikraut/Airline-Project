import City from "../models/city.js";

export class CityRepository {
  // CREATE
  async createCity(data) {
    try {
      const city = await City.create(data);
      return city;
    } catch (error) {
      throw error;
    }
  }

  // GET ALL
  async getAllCities() {
    try {
      return await City.find();
    } catch (error) {
      throw error;
    }
  }

  // GET ONE
  async getCityById(id) {
    try {
      return await City.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  async updateCity(id, data) {
    try {
      return await City.findByIdAndUpdate(id, data, {
        new: true, // returns updated record
      });
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  async deleteCity(id) {
    try {
      return await City.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
