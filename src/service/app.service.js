const { client } = require("../db/influxdb.config");
const Temp = require("../db/model/tempSchema");

const addNewUser = async (newUser) => {
  try {
    if (typeof newUser != "string" || !newUser) {
      throw Error("Your User Name Must Be a String");
    }

    const row = [
      {
        measurement: "add_user",
        tags: { host: "localhost", app: "task", Instanc: "1" },
        fields: { uname: newUser },
        timestamp: new Date(),
      },
    ];

    const users = await client.queryRaw("select * from add_user");

    let checkExistUser;

    if (
      users.results &&
      users.results[0].series &&
      users.results[0].series[0].values
    ) {
      users.results[0].series[0].values.forEach((element) => {
        checkExistUser = element.includes(newUser);
      });
    }
    if (!checkExistUser) {
      await client.writePoints(row);

      return `${newUser} added successfully`;
    } else {
      throw Error("Your username must be unique");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

const getUsersAndTemp = async () => {
  try {
    const user = await client.queryRaw("select * from add_user");
    const temperature = Math.floor(Math.random() * (100 - 1) + 1);

    if (user.results[0].series) {
      console.log({
        Users: user.results[0].series[0].values,
        Cpu_temperature: `${temperature} degrees Celcius`,
      });
    }

    const row = [
      {
        measurement: "add_temp",
        tags: { host: "localhost", app: "task", Instanc: "1" },
        fields: { temp: temperature },
        timestamp: new Date(),
      },
    ];

    await client.writePoints(row);
  } catch (error) {
    throw new Erorr(error.message);
  }
};

const getAvgOfTemps = async () => {
  try {
    const fiveMinAgo = new Date();

    fiveMinAgo.setMinutes(fiveMinAgo.getMinutes() - 5);

    const temps = await client.queryRaw(
      `SELECT mean(temp) FROM "add_temp" WHERE time >= '${fiveMinAgo
        .toISOString()
        .substring(0, 24)
        .trim()}' `
    );

    if (temps.results[0].series) {
      const avg = temps.results[0].series[0].values[0][1];
      addAvgToMongoDb(avg);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addAvgToMongoDb = async (avg) => {
  const newTempAvg = new Temp({ temp_avg: avg });
  try {
    await newTempAvg.save();
  } catch (error) {
    console.log(error.message);
  }
};

const getLastAvg = async () => {
  try {
    const tempAvg = await Temp.find({}).sort({ _id: -1 }).limit(1);
    return tempAvg;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getAvgOfTemps, getUsersAndTemp, addNewUser, getLastAvg };
