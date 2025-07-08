import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mongoConnection from "./config/mongoConfig.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 4000;

// allow cors
app.use(cors());

//request body
app.use(express.json());

//base get api
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Financial Tracker api",
  });
});

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
    console.log("Conection error");
    console.log(err.message);
  });
