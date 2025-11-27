// repositories/cancel-booking-repository.js
import CrudRepository from "./crudRepository.js";
import CancelBooking from "../models/cancelled_booking.js";

class CancelBookingRepository extends CrudRepository {
  constructor() {
    super(CancelBooking);
  }

  async cancelBooking(data) {
    // Same as create() but kept separate for readability
    const response = await CancelBooking.create(data);
    return response;
  }
}

export default CancelBookingRepository;
