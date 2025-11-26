// No StatusCodes, No ErrorResponse, No AppError

export function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    return res.status(400).json({
      message: "Failed to create an airplane",
      error: "Model number is required",
    });
  }

  if (!req.body.capacity) {
    return res.status(400).json({
      message: "Failed to create an airplane",
      error: "Capacity is required",
    });
  }

  next();
}

export function validateUpdateRequest(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Failed to update an airplane",
      error: "Request body cannot be empty",
    });
  }

  if (req.body.capacity !== undefined) {
    if (req.body.capacity < 0) {
      return res.status(400).json({
        message: "Invalid airplane capacity",
        error: "Capacity cannot be negative",
      });
    }
  }

  next();
}

export function validateSeats(req, res, next) {
  const seats = req.body.capacity;

  if (seats < 0) {
    return res.status(400).json({
      message: "Invalid airplane seats",
      error: "Seats cannot be negative",
    });
  }

  next();
}

export default {
  validateCreateRequest,
  validateUpdateRequest,
  validateSeats,
};
