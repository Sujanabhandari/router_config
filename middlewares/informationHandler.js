//middleware that blocks any request that is not a GET request
const postInformationHandler = (req, res, next) => {
  const {first_name, last_name, age } = req.body;
  if (!first_name || !last_name || !age) return res.status(400).send("The request body must have values for first_name, last_name, age");
};

module.exports = postInformationHandler;
