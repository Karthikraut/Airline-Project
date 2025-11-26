// No StatusCodes, No ErrorResponse, No AppError

export function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Failed to create an airport",
      error: "Name is required",
    });
  }

  if (!req.body.code) {
    return res.status(400).json({
      message: "Failed to create an airport",
      error: "Airport code is required",
    });
  }

  if (!req.body.cityId) {
    return res.status(400).json({
      message: "Failed to create an airport",
      error: "City ID is required",
    });
  }

  next();
}

export function validateUpdateRequest(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Failed to update an airport",
      error: "Request body cannot be empty",
    });
  }

  next();
}

export default {
  validateCreateRequest,
  validateUpdateRequest,
};
