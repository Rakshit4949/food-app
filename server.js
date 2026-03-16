const express = require('express');
const colors = require("colors");
const cors =  require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require('./routes/models/controllers/config/data/middlewares/utils/db');


//dot en configuration
dotenv.config();

//DB connection
connectDb();
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//route
// url => http://localhost:9000
app.use('/api/v1/test', require('./routes/testRoute'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.get('/', (req,res) => {
    return res.status(200).send("<h1> Great to see you in this server</h1>");
});

//PORT
const PORT = process.env.PORT || 9000;

//listen
app.listen(PORT, () => {
  console.log(`server run on ${PORT}`.white.bgMagenta);
});