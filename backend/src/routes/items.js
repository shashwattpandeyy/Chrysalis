import express from 'express';
import response from '../middlewares/response';
import { get, getItemDetail } from '../controllers/itemController';

export default function itemRouter() {
  const router = express.Router();

  router.get('/', get, response);

  router.get('/:id', getItemDetail, response);

  return router;
}
