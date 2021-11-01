const { addNewUser, getLastAvg } = require("../service/app.service");

const addNewUserController = async (req, res) => {
  try {
    const NewArticleInfo = await addNewUser(req.body.username);

    res.status(201).send(NewArticleInfo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getLastAvgController = async (req, res) => {
  try {
    const avg = await getLastAvg();

    res.status(201).send(avg);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { addNewUserController,getLastAvgController };
