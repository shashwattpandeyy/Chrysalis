export default function errorHandler(err, req, res, next) {
  return res.status(err?.status || '500').send(err?.message || 'something went wrong');
}
