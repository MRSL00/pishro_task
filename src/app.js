const express = require("express");
const app = express();
const logger = require("morgan");
const cron = require("node-cron");
const dotenv = require("dotenv");
const { getAvgOfTemps, getUsersAndTemp } = require("./service/app.service");
app.use(express.json());
app.use(logger("dev"));
dotenv.config();


require("./db/mongodb.config");

app.use("/", require("./router/api"));

// get all users and temp every 10 second
cron.schedule("*/10 * * * * *", getUsersAndTemp);

// get avg of temp every 5 Minutes and save in modngodb
cron.schedule("*/2 * * * * *", getAvgOfTemps);

app.listen(process.env.PORT);
console.log("Server Runing At http://localhost:8009/");
