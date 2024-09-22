import BaseError from './baseError';

export class Unauthorized extends BaseError {
  constructor(message = 'Unauthorized', status = '401') {
    super(status, message);
  }
}
