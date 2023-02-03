require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRoutes = require('./routes/user.js');
const dataRoutes = require('./routes/data-access.js')

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/data-access' , dataRoutes);

app.use((req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  });
  
const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log(`Authorization Server running on ${port} listening`);
})


