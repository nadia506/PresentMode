const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "server error");
});

app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(PORT, () => {
  console.log(`listening http://localhost:${PORT}`);
});
