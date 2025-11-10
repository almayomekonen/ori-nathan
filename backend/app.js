const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const articlesRoutes = require("./routes/articleRoutes");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log("💥mongodb connected successfully💥"))
  .catch((error) => console.error(error));

app.use("/api", authRoutes);
app.use("/api", articlesRoutes);

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
