const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

const Station = require('./models/station');

mongoose.connect(
  `mongodb+srv://admin:admin@cluster0.tr2wt.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/api/stations', async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

app.post('/api/add', async (req, res) => {
  const station = new Station({
    name: req.body.name,
    range: req.body.range,
  });

  await station.save();

  res.json(station);
});

app.post('/api/delete', async (req, res) => {
  const id = req.body.id;
  const station = await Station.findByIdAndRemove(id);
  res.json(station);
});

app.post('/api/update', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const range = req.body.range;
  const result = await Station.findByIdAndUpdate(
    id,
    { $set: { name, range } },
    { new: true }
  );

  res.json(result);
});

app.get('/api/station/:id', async (req, res) => {
  const result = await Station.findById(req.params.id);
  res.json(result);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listeting on port ${port}`);
});
