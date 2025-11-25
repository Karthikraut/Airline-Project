import {User} from "../models/userModel.js";
import Auth  from "../utils/auth.js"; // bcrypt + jwt utils

// ------------------- SIGNUP ------------------------
export async function signup(data) {
  try {

    // Hash password before saving
    const hashedPassword =await Auth.createPassword(data.password);

   
    const newUser = {
      ...data,
      password: hashedPassword,
      role: "customer", // only customer can signup
    };

    const user = await User.create(newUser);

    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw new Error(error.message || "Signup failed");
  }
}

// ------------------- SIGNIN ------------------------
export async function signin(data) {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("User not found for this email");

    const isPasswordValid = await Auth.checkPassword(data.password, user.password);

    if (!isPasswordValid) throw new Error("Incorrect password");

    const token = Auth.createToken({ id: user._id, email: user.email, role: user.role });

    return token;
  } catch (error) {
    throw new Error(error.message || "Signin failed");
  }
}

// ------------------- AUTH CHECK ------------------------
export async function isAuthenticated(token) {
    try {
      token = token.split(" ")[1]
     
        if (!token) throw new Error("Token is required");

        const decoded = Auth.verifyToken(token);

        const user = await User.findById(decoded.id);
        if (!user) throw new Error("User does not exist for this token");

        if (user.status === "blocked" || user.status === "deleted") {
            throw new Error("User account is not active");
        }

        return decoded;
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        }

        if (error.name === "TokenExpiredError") {
            throw new Error("Token expired");
        }

        throw new Error(error.message || "Authentication failed");
    }
}

// ------------------- ADD ROLE TO USER ------------------------
export async function addRoleToUser({role,userId}) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const validRoles = ["customer", "admin", "flight_company"];
        if (!validRoles.includes(role)) {
            throw new Error("Invalid role provided");
        }

        user.role = role;
        await user.save();

        return user;
    } catch (error) {
        throw new Error(error.message || "Failed to assign role");
    }
}

// ------------------- IS ADMIN ------------------------
export async function isAdmin(id) {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        return user.role === "admin";
    } catch (error) {
        throw new Error(error.message || "Role check failed");
    }
}

// ------------------- IS FLIGHT COMPANY ------------------------Q
export async function isFlightCompany(id) {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        return user.role === "flight_company";
    } catch (error) {
        throw new Error(error.message || "Role check failed");
    }
}

export default {
  signup,
  signin,
  isAuthenticated,
  addRoleToUser,
  isAdmin,
  isFlightCompany
}
