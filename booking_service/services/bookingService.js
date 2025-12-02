import axios from "axios";
import mongoose from "mongoose";
import { BookingRepository, CancelBookingRepository } from "../repositories/index.js";
import { ServerConfig, Queue } from "../config/index.js";
import { Enums } from "../utils/common.js";
import * as PaymentService from "./payment-service.js";

const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();
const cancelBookingRepository = new CancelBookingRepository();

/**
 * CREATE BOOKING
 */
export async function createBooking(data) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );

    const flightData = flight.data.data;

    if (data.noOfSeats > flightData.totalSeats) {
      throw new Error("Sorry! Seats are not available");
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;

    const bookingPayload = {
      ...data,
      totalCost: totalBillingAmount,
    };

    const booking = await bookingRepository.createBooking(
      bookingPayload,
      { session }
    );

    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      { seats: data.noOfSeats }
    );

    await session.commitTransaction();
    session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === "ERR_BAD_REQUEST") {
      throw new Error("There is no flight available for the request you made!");
    }

    if (error.message.includes("available")) {
      throw new Error("Sorry! Seats are not available");
    }

    throw new Error("Sorry! Booking failed. Booking Service is down");
  }
}

/**
 * MAKE PAYMENT
 *  Mongoose session started and transaction started
 * 
 */
export async function makePayment(data) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      { session }
    );

    if (bookingDetails.status === BOOKED)
      throw new Error("You have already booked this flight.");

    if (bookingDetails.status === CANCELLED)
      throw new Error("Booking session has expired");

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    // 5 minute expiration
    if (currentTime - bookingTime > 300000) {
      await cancelBooking(data.bookingId);
      throw new Error("Booking session has expired");
    }

    if (bookingDetails.userId != data.userId)
      throw new Error("User data does not match booking");

    data.totalCost = bookingDetails.totalCost;

    // STRIPE PAYMENT FLOW
    const newCustomer = await PaymentService.createNewCustomer(data);
    data.customer_Id = newCustomer.id;

    const newCard = await PaymentService.addNewCard(data);
    data.card_Id = newCard.card;

    const paymentCharge = await PaymentService.createCharges(data);

    // Update booking status
    await bookingRepository.update(
      data.bookingId,
      { status: BOOKED },
      { session }
    );

    // EMAIL CONTENT
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}`
    );

    const flightData = flight.data.data;
    const flightDepartureTime = new Date(flightData.departureTime);
    const flightArrivalTime = new Date(flightData.arrivalTime);

    Queue.sendData({
      recepientEmail: data.userEmail,
      subject: "Flight Booking Confirmation",
      text: `
Dear ${data.name},
Your flight is booked successfully.

Flight Number: ${flightData.id}
Departure: ${flightData.departureAirportId} at ${flightDepartureTime.toLocaleString()}
Arrival: ${flightData.arrivalAirportId} at ${flightArrivalTime.toLocaleString()}

Download your receipt:
${paymentCharge.receipt_url}
      `,
    });

    await session.commitTransaction();
    session.endSession();

    return paymentCharge;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw new Error("Sorry! Payment failed. Payment Service is down");
  }
}

/**
 * CANCEL BOOKING
 */
export async function cancelBooking(bookingId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingDetails = await bookingRepository.get(
      bookingId,
      { session }
    );

    if (bookingDetails.status === CANCELLED) {
      await session.commitTransaction();
      session.endSession();
      return true;
    }

    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,
      {
        seats: bookingDetails.noOfSeats,
        dec: false,
      }
    );

    await bookingRepository.update(
      bookingId,
      { status: CANCELLED },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.message.includes("not found")) {
      throw new Error("No booking found to cancel");
    }

    throw new Error("Sorry! Cancellation was unsuccessful");
  }
}
