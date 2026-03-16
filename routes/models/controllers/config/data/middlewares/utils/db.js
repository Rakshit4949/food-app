const { bgRed } = require('colors');
const mongoose = require('mongoose');
const colors = require("colors");
//function mongodb database connection
const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL)
      console.log(`Connection established ${mongoose.connection.host} `.bgBlue);
    } catch (error) {
        console.log("DB Error".bgRed, error);
    }
};

module.exports = connectDb;