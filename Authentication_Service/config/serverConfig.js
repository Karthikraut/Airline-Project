import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
  BOOKING_SERVICE: process.env.BOOKING_SERVICE,
};
