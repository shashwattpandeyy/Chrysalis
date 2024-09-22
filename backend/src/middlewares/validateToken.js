import { get } from 'lodash-es';
import { Unauthorized } from '../errors/errors';

export default async function validateToken(req, res, next) {
  const token = get(req, 'headers.authorization');

  if (!token) {
    // return error
    next(new Unauthorized());
  }

  next();
}
