const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/UserRoutes');
const { Chats } = require("./Data/Chat.cjs");
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/Error')

dotenv.config({ path: '/ChatApp/config.env' });
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', UserRouter);

app.use(notFound);
app.use(errorHandler);

// app.post('/api/user', (req, res) => {
//   console.log('api/user')
// });

app.get('/chat/api', (req, res) => {
  res.json(Chats);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});