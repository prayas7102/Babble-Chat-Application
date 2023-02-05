const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/UserRoutes');
const ChatRoutes = require('./routes/ChatRoutes');
const { Chats } = require("./Data/Chat.cjs");
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/Error');

dotenv.config({ path: '/ChatApp/config.env' });
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api/user', UserRouter);
app.use('/api/chats', ChatRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/chat/api', (req, res) => {
  res.json(Chats);
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const io = require('socket.io')(server, {
  pingeTimeout: 60000,
  cors:{
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket)=>{
  console.log("connected to socket.io");
});