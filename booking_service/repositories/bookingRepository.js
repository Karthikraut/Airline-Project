import Booking from "../models/booking.js";
import { Enums } from "../utils/common.js";
import CrudRepository from "./crudRepository.js";

const { CANCELLED, BOOKED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data) {
        const response = await Booking.create(data);
        return response;
    }

    async getBookings(userId) {
        const response = await Booking.find({ userId });
        return response;
    }

    async get(id) {
        const response = await Booking.findById(id);
        if (!response) {
            throw new Error("Booking not found");
        }
        return response;
    }

    async update(id, data) {
        const response = await Booking.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!response) {
            throw new Error("Booking not found");
        }

        return response;
    }

    async cancelledBookings(timestamp) {
        const response = await Booking.updateMany(
            {
                createdAt: { $lt: timestamp },
                status: { $nin: [BOOKED, CANCELLED] },
            },
            { status: CANCELLED }
        );

        return response;
    }

    async getAll(timestamp) {
        const response = await Booking.find({
            createdAt: { $lt: timestamp },
            status: { $nin: [BOOKED, CANCELLED] },
        });

        return response;
    }
}

export default BookingRepository;
