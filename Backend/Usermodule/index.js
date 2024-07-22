const express = require('express');
const cors = require('cors');



const connectDB = require('./databse/db');
//const userRoutes = require('./routes/userrout');
const employeeRoutes = require('./routes/employeeRoutes');  //change
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

//app.use('/api',userRoutes);
app.use('/api', employeeRoutes);   //changes


const PORT = process.env.PORT || 5001;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));


