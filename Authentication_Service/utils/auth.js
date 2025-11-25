import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import ServerConfig from "../config/serverConfig.js"



function checkPassword(plainPassword, encryptedPassword) {
  //  if the password is valid/not
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

async  function createPassword(password){
    try{
        var salt_round = Number(ServerConfig.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt_round);
        return hashedPassword;
    }catch(error){
        throw error;
    }
}

function createToken(input) {
  // creating a JWT Token and returning it to the client
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    throw error;
  }
}

function verifyToken(token) {
  // verifying a JWT Token
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    throw error;
  }
}

export default {
  createPassword,
  checkPassword,
  createToken,
  verifyToken,
};