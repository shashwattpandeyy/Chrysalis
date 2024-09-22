import { Router } from 'express';
import { login, register } from '../controllers/authController';
import response from '../middlewares/response';

export default function authRouter() {
  const router = Router();

  router.post('/register', register, response);

  router.post('/login', login, response);

  return router;
}
