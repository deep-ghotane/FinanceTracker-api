import mongoose from "mongoose";
import transactionSchema from "./transactionSchema.js";

const Transaction = mongoose.model("Transaction", transactionSchema);

//get transactions
export const getTransactionsById = (userId) => {
  return Transaction.find({ userId: userId });
};

//create transaction
export const insertTransaction = (transactionObj) => {
  return Transaction.insertOne(transactionObj);
};

//delete transaction
export const deleteTransactionById = (id, userId) => {
  return Transaction.findOneAndDelete({ _id: id, userId: userId });
};

//delete transactions multiple

export const deleteTransactionsById = (idesToDelete, userId) => {
  return Transaction.deleteMany({
    _id: { $in: idesToDelete },
    userId: userId,
  });
};
