require("dotenv").config();
const express = require('express');
const app = express();

const userRoutes = require('./routes/user.js');

app.use(express.json());
app.use('/api/user', userRoutes);

const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log(`Authorization Server running on ${port} listening`);
})

