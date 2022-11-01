import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import {Chats} from "./Data/Chat.cjs"

dotenv.config({ path: '/ChatApp/config.env' });

const app = express();
app.use(cors())
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('ch');
});

app.get('/chat/api', (req, res) => {
  // console.log(Chats)
  res.json(Chats);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});