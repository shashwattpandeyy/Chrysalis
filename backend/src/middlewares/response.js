export default function response(req, res, next) {
  return res.status(200).send(res.locals['data']);
}
