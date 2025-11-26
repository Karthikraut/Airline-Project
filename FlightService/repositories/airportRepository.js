import Airport from "../models/airport.js";

export class AirportRepository {
  // CREATE
  async createAirport(data) {
    try {
      return await Airport.create(data);
    } catch (error) {
      throw error;
    }
  }

  // GET ALL
  async getAllAirports() {
    try {
      return await Airport.find().populate("cityId"); 
      // populate city info if needed
    } catch (error) {
      throw error;
    }
  }

  // GET BY ID
  async getAirportById(id) {
    try {
      return await Airport.findById(id).populate("cityId");
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  async updateAirport(id, data) {
    try {
      return await Airport.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  async deleteAirport(id) {
    try {
      return await Airport.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
