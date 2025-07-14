import express from "express";
import cors from "cors";
import mongoConnection from "./config/mongoConfig.js";
import dotenv from "dotenv";
import { loginUser, registerUser } from "./controllers/authControllers.js";
import {
  createTransaction,
  getTransactions,
} from "./controllers/transactionControllers.js";
import { auth } from "./middleware/authmiddleware.js";

dotenv.config();

const app = express();

//GET PORT
const PORT = process.env.PORT || 4000;

// allow cors
app.use(cors());

//request body
app.use(express.json());

//Routes
//base get api
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Financial Tracker api",
  });
});

//AUTH
//POST request to register users
app.post("/api/v1/auth", registerUser);

//login
app.post("/api/v1/auth/login", loginUser);

//transactions
//create a transaction
app.post("/api/v1/transactions", auth, createTransaction);

//fetch transactions
app.post("/api/v1/transactions", auth, getTransactions);

//mongo connection
mongoConnection()
  .then(() => {
    console.log("Connection sucess");
    //listner
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server starting error");
      } else {
        console.log("Server start at: ", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Database connection error");
  });
