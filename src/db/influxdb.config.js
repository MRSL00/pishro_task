const Influx = require("influx");
const dotenv = require("dotenv");
dotenv.config();

const info = {
  host: process.env.HOST,
  port: 8086,
  username: process.env.UNAME,
  password: process.env.PASS,
};

let client = new Influx.InfluxDB({ database: "temp_and_user", ...info });

client.getDatabaseNames().then((name) => {
  if (!name.includes("temp_and_user")) {
    client.createDatabase("temp_and_user");
  }
});

module.exports = { client };
