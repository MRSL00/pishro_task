const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/task_temp",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log(err.message);
    console.log("[+] Database connected succesfully.");
  }
);