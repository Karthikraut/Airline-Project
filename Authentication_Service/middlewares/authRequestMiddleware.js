import UserService from "../services/userService.js"
function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    return res.status(400).json({
      message: "Failed to authenticate the user",
      error: "Email not provided",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      message: "Failed to authenticate the user",
      error: "Password not provided",
    });
  }

  next();
}

async function checkAuth(req, res, next) {
  try {
    console.log("Req Headers:- ")

    const response = await UserService.isAuthenticated(
      req.headers["authorization"]
    );

    if (response) {
      req.user = response.id;
      req.headers["user-email"] = response.email;
      req.headers["user-id"] = response.id;
      return next();
    }
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
}

async function isAdmin(req, res, next) {
  const isAdmin = await UserService.isAdmin(req.user);
  const isFlightCompany = await UserService.isFlightCompany(req.user);

  if (!isAdmin && !isFlightCompany) {
    return res.status(401).json({
      message: "User not authorized to perform this action",
    });
  }

  next();
}

function validateAddRoleRequest(req, res, next) {
  if (!req.body.role) {
    return res.status(400).json({
      message: "Failed to add a role",
      error: "Role not provided",
    });
  }

  if (!req.body.userId) {
    return res.status(400).json({
      message: "Failed to add a role",
      error: "User ID not provided",
    });
  }

  next();
}

export default {
  validateAuthRequest,
  checkAuth,
  isAdmin,
  validateAddRoleRequest,
};
