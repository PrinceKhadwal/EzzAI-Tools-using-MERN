const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
require('dotenv').config();
const connectDB = require('./db/conn');

const UserRoutes = require('./routes/userRoutes');

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api/auth/user', UserRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the ChatGPT Clone Server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.MODE} mode on http://localhost:${PORT}`.bgMagenta.white);
});
