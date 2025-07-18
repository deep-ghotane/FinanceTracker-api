import bcrypt from "bcryptjs";
import { createUser, getUser } from "../models/users/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    //register user logic
    //{username,email,password
    let userObject = req.body;

    //encrypt password
    let salt = bcrypt.genSaltSync(10);

    userObject.password = bcrypt.hashSync(userObject.password, salt);

    let newUser = await createUser(userObject);

    return res.status(201).json({
      status: true,
      message: "User successfully created",
    });
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("E11000")) {
      return res.status(400).json({
        status: false,
        message: "Email already used",
      });
    }
    return res.status(500).json({
      status: false,
      message: "SERVER ERROR",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    //login user
    // let email = req.body.email;
    // let password = req.body.password;

    let { email, password } = req.body;
    //fetch user from db
    let user = await getUser({ email: email });

    if (user) {
      //if user found
      //user.password -> db password
      //compare password with user.password

      let passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        user.password = "";
        let payload = {
          email: user.email,
        };
        let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });

        return res.status(200).json({
          status: true,
          message: "Login successful",
          user,
          accessToken,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "User not authenticated",
        });
      }
    } else {
      //user not found
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "SERVER ERROR",
    });
  }
};
