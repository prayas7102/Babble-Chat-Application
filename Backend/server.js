const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { Chats } = require("./Data/Chat.cjs");
const { connectDB } = require('./config/db');

dotenv.config({ path: '/ChatApp/config.env' });
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('ch');
});

app.get('/chat/api', (req, res) => {
  res.json(Chats);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});