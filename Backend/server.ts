import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import {chats} from "./Data/Chat";

dotenv.config({ path: '/ChatApp/config.env' });

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send(chats);
});

app.get('/chat/api', (req: Request, res: Response) => {
  console.log(chats)
  res.send(chats);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});