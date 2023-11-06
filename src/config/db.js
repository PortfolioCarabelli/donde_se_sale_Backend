const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("[DATABASE]: connected successfully");
  } catch (error) {
    console.log(
      `there was an error while triying to connect to the database: ${JSON.stringify(
        error
      )}`
    );
  }
};
