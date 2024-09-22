import app from './src/app';
import http from 'http';
import 'dotenv/config';
import { configDotenv } from 'dotenv';

configDotenv({ path: `.env.${process.env.NODE_ENV || 'staging'}` });

async function initializeServer() {
  const server = http.createServer(await app());

  const port = process.env.PORT;

  server.listen(port, () => console.log(`server is running on port ${port}`, process.pid));
}

initializeServer();
