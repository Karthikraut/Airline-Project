import UserService from "../services/userService.js";

/*
method: POST
URL: /signup
*/
async function signup(req, res) {
  try {
    
    const user = await UserService.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.json({
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    return res.json({
      message: error.message || "Something went wrong",
    });
  }
}

/*
method: POST
URL: /signin
*/
async function signin(req, res) {
  try {
    
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });

    return res.json({
      message: "Login successful",
      data: user,
    });

  } catch (error) {
    return res.json({
      message: error.message || "Something went wrong",
    });
  }
}

/*
method: POST
URL: /addRoleToUser
*/
async function addRoleToUser(req, res) {
  try {
    const user = await UserService.addRoleToUser({
      role: req.body.role,
      userId: req.body.userId,
    });

    return res.json({
      message: "Role added successfully",
      data: user,
    });

  } catch (error) {
    return res.json({
      message: error.message || "Something went wrong",
    });
  }
}

export default {
  signup,
  signin,
  addRoleToUser
};
