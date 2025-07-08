import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";

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

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server could not be started", err);
  } else {
    console.log("Server Started at PORT: ", PORT);
  }
});
