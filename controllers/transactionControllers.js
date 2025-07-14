import jwt from "jsonwebtoken";
import { getUser } from "../models/users/userModel.js";
import { insertTransaction } from "../models/transactions/transationModel.js";
export const createTransaction = async (req, res) => {
  try {
    let accessToken = req.headers.authorization;

    let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log("DECODED VALUE: ", decoded);

    let user = await getUser({ email: decoded.email });

    if (user) {
      let transactionObject = req.body;
      //add user id to transactionObject
      transactionObject.userId = user._id;

      let newTransaction = await insertTransaction(transactionObject);

      return res.status(201).json({
        status: true,
        message: "Transaction created",
        transaction: newTransaction,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
