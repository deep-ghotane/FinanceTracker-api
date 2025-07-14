
import { insertTransaction } from "../models/transactions/transationModel.js";
export const createTransaction = async (req, res) => {
  try {
    let transactionObject = req.body;
    //add user id to transactionObject
    transactionObject.userId = req.user._id;

    let newTransaction = await insertTransaction(transactionObject);

    return res.status(201).json({
      status: true,
      message: "Transaction created",
      transaction: newTransaction,
    });
  } catch (err) {
    console.log(err);
    return res.status.(500).json({
        status: false,
        message: err.message
    })
  }
};
