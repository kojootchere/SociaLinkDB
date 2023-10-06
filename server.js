const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');  // assuming you have a 'routes' directory
const cors = require('cors');  // if you need CORS support

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());  // for parsing application/json
app.use(cors());  // enable CORS for all routes (adjust as needed)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kojootchere:403HPNsbr17OZp4j@cluster0.xc20kvo.mongodb.net/SociaLinkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Connection Events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});

// API Routes
app.use('/api', routes);  // your API routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'An unexpected error occurred!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
