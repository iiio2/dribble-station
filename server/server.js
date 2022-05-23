const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client/build'));

const Station = require('./models/station');
const User = require('./models/user');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`,
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

// User Section

// Register
app.post('/api/user/register', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send('User already registered');

  user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(user);
});

// Login
app.post('/api/user/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or passowrd');

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send('Invalid email or passowrd');

  const token = user.generateAuthToken();

  res.send(token);
});

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listeting on port ${port}`);
});
