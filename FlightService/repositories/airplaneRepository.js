import Airplane from "../models/airplane.js";

export class AirplaneRepository {
  // CREATE
  async createAirplane(data) {
    try {
      return await Airplane.create(data);
    } catch (error) {
      throw error;
    }
  }

  // GET ALL
  async getAllAirplanes() {
    try {
      return await Airplane.find();
    } catch (error) {
      throw error;
    }
  }

  // GET BY ID
  async getAirplaneById(id) {
    try {
      return await Airplane.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  async updateAirplane(id, data) {
    try {
      return await Airplane.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  async deleteAirplane(id) {
    try {
      return await Airplane.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
