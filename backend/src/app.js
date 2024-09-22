import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import validateToken from './middlewares/validateToken';
import errorHandler from './middlewares/errorHandler';
import initializeRoutes from './routes';
import initializeDbConnection from './database/seeds/connection';
import { fileURLToPath } from 'url';

export default async function app() {
  await initializeDbConnection();

  const app = express();

  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);

  // app.use(express.static(path.join(__dirname, '../../frontend/build/')));

  app.use(express.static('build'));

  app.use(morgan());

  app.use(cors());

  app.use(validateToken);

  const routes = initializeRoutes();

  app.use('/auth', routes.authRoute);

  app.use('/items', routes.itemRoute);

  app.use(errorHandler);

  return app;
}
