// city-middleware.js (ES Modules)

export function validateCreateRequest(req, res, next) {
  if (!req.body.city || !req.body.state || !req.body.country) {
    return res.status(400).json({
      message: "Failed to create a city",
      error: "City information is required",
    });
  }

  next();
}

export function validateUpdateRequest(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Failed to update a city",
      error: "Request body cannot be empty",
    });
  }

  next();
}

export default {
  validateCreateRequest,
  validateUpdateRequest,
};
