require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3500;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES

app.use('/', require('./routes/jwtAuth'));

// register & login routes
app.use('/auth', require('./routes/jwtAuth'));

app.listen(PORT, () => {
  console.log(`backend server is running in port ${PORT}`);
});
