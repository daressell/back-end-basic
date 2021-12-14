const express = require("express");
require("dotenv").config();
const cors = require("cors");
const recursive = require("recursive-readdir-sync");
const handleError = require("./middleware/handleError");

const HOST_PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

recursive(`${__dirname}/routes`).forEach((file) => app.use("/", require(file)));

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log("start server on port", HOST_PORT);
});
