import ItemService from '../services/itemService';

async function get(req, res, next) {
  const query = req.query;

  const itemService = new ItemService();

  const data = await itemService.getItems(query);

  res.locals['data'] = data;

  next();
}

async function getItemDetail(req, res, next) {
  const id = req.params;

  const itemService = new ItemService();

  const data = await itemService.getOneItem(id);

  res.locals['data'] = data;

  next();
}

export { get, getItemDetail };
