const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/commodityDB').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB', err);
});

const priceSchema = new mongoose.Schema({
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const Price = mongoose.model('Price', priceSchema);

app.post('/api/add-point', (req, res) => {
  const newPrice = new Price({ price: req.body.price, timestamp:new Date() });
  newPrice.save().then(() => res.status(200).json({ message: 'Price added successfully!' }));
});

app.get('/api/get-points', (req, res) => {
  const filter = req.query.filter;

  let query = {};
  if (filter === '10m') {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    query = { timestamp: { $gte: tenMinutesAgo } };
  } else if (filter === '1h') {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    query = { timestamp: { $gte: oneHourAgo } };
  }

  Price.find(query).select('price timestamp').sort({ timestamp: 1 }).then((prices) => res.json(prices));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
