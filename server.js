require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/assignment13';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// GET all products
app.get('/product/get', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// CREATE product
app.post('/product/create', async (req, res) => {
  try {
    const { id, product } = req.body;

    if (id == null || !product) {
      return res.status(400).json({ error: 'id and product payload are required' });
    }

    const newProduct = new Product({ id, product });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create product', details: err.message });
  }
});

// UPDATE product by MongoDB _id
app.put('/product/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updated = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update product', details: err.message });
  }
});

// DELETE product by MongoDB _id
app.delete('/product/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete product', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Assignment 13 API is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
