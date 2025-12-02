import Stripe from "stripe";
import { ServerConfig } from "../config/index.js";

const stripe = new Stripe(ServerConfig.STRIPE_SECRET_KEY);

export async function createNewCustomer(data) {
  try {
    const customer = await stripe.customers.create({
      name: data.name,
      email: data.userEmail,
    });

    return customer;
  } catch (error) {
    if (error.type === "StripeCardError") {
      throw new Error(error.raw?.message || "Stripe card error");
    }

    throw new Error("Failed to create a new customer. Stripe service is unavailable.");
  }
}

export async function addNewCard(data) {
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        name: data.name,
        number: data.card_Number,
        exp_month: data.card_ExpMonth,
        exp_year: data.card_ExpYear,
        cvc: data.card_CVC,
      },
    });

    const card = await stripe.customers.createSource(data.customer_Id, {
      source: cardToken.id,
    });

    return card;
  } catch (error) {
    if (error.type === "StripeCardError") {
      throw new Error(error.raw?.message || "Stripe card error");
    }

    throw new Error("Failed to add card. Stripe service is unavailable.");
  }
}

export async function createCharges(data) {
  try {
    const charge = await stripe.charges.create({
      amount: data.totalCost * 100, // amount in paise
      currency: "inr",
      card: data.card_Id,
      customer: data.customer_Id,
      description: "Flight Booking Payment Receipt | DevRev-AirLine",
    });

    return charge;
  } catch (error) {
    if (error.type === "StripeCardError") {
      throw new Error(error.raw?.message || "Stripe card error");
    }

    throw new Error("Payment failed. Stripe service is unavailable.");
  }
}
