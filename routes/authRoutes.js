const express = require('express');
const { registerController, loginController } = require('./models/controllers/authControllers');

const router = express.Router();

//routes
//REGSISTER || POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login', loginController);

module.exports = router;