import dotenv from 'dotenv';
import express from 'express';
import {chats} from "./Data/Chat";

dotenv.config({ path: '/ChatApp/config.env' });

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('ch');
});

app.get('/chat/api', (req, res) => {
  console.log(chats)
  res.send(chats);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});