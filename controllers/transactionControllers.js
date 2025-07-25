import {
  deleteTransactionByUserId,
  getTransactionsById,
  insertTransaction,
} from "../models/transactions/transationModel.js";

//create transaction
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
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//get user transaction
export const getTransactions = async (req, res) => {
  try {
    //fetch the transactions
    let userId = req.user._id;

    let transactions = await getTransactionsById(userId);

    return res.status(200).json({
      status: true,
      message: "Trasanctions fetched",
      transactions,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch transactions",
    });
  }
};

//create delete api

export const deleteTransaction = async (req, res) => {
  try {
    // fetch the trasactions
    // auth middleware
    let userId = req.user._id;
    let transactionid = req.params.transactionid;

    let transaction = await deleteTransactionByUserId(transactionid, userId);

    return res.status(200).json({
      status: true,
      message: "Trasaction deleted!",
      transaction,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete transaction",
    });
  }
};

//create multiple transaction api
