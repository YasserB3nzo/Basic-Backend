require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require ('./Routes/userRoutes');

app.use(express.json()); // to parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/', userRoutes);

const Port = process.env.PORT || 8081;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});