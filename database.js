const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://jahnavibansal8:xdU8iINU91SXYUDX@cluster0.bxawmid.mongodb.net/?retryWrites=true&w=majority&wtimeout=30000', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose Schema
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
  field1: String,
  field2: Number,

});

const ExampleModel = mongoose.model('Example', exampleSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());

// CRUD operations

// Create
app.post('/api/examples', async (req, res) => {
  try {
    const example = new ExampleModel(req.body);
    await example.save();
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read
app.get('/api/examples', async (req, res) => {
  try {
    const examples = await ExampleModel.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put('/api/examples/:id', async (req, res) => {
  try {
    const example = await ExampleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete('/api/examples/:id', async (req, res) => {
  try {
    const example = await ExampleModel.findByIdAndDelete(req.params.id);
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
